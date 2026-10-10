import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";
import { Server, Socket } from "socket.io";
import { fileURLToPath } from "url";
import path from "path";

import { env, isProduction } from "./config/env.js";
import { prisma } from "./lib/prisma.js";
import userRouter from "./routes/userRoute.js";
import profileRouter from "./routes/profileRoute.js";
import passwordRouter from "./routes/passwordRoute.js";
import messageRouter from "./routes/messageRoute.js";
import { isAuth, isSocketAuth } from "./middlewares/auth.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
import helmet from "helmet";
import { globalLimiter } from "./routes/rateLimiters.js";
import { sendMessageSchema } from "./utils/validationSchema.js";
import { setSocketIO } from "./controllers/user.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

// Required so rate limiting / secure cookies behave correctly behind a proxy.
app.set("trust proxy", 1);

const allowedOrigins = [
  env.CLIENT_DEVELOPMENT_DOMAIN,
  env.CLIENT_PRODUCTION_DOMAIN,
].filter(Boolean) as string[];

// Socket.IO CORS
export const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

// Provide socket.io instance to controllers (avoid circular dependency)
setSocketIO(io);

io.use(isSocketAuth);

app.use(helmet());
app.use(globalLimiter);
app.use(express.json({ limit: "1mb" }));

// Express CORS
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello From Server");
});

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

app.use("/api/users", userRouter);
app.use("/api/profile", profileRouter);
app.use("/api/users/password", passwordRouter);
app.use("/api/messages", isAuth, messageRouter);

io.on("connection", (socket: Socket) => {
  console.log("connected user: ", socket.data.userInfo);
  const userId = socket.data.userInfo.id;
  socket.join(userId);

  socket.on("disconnected", () => {
    console.log("disconnected user: ", socket.id);
  });

  socket.on("send_message", async (payload: unknown) => {
    try {
      const validation = sendMessageSchema.safeParse(payload);
      if (!validation.success) {
        socket.emit("error", { message: validation.error.issues.map((e) => e.message).join(", ") });
        return;
      }

      const { receiverId, content, attachment } = validation.data;
      const senderId = userId;

      const message = await prisma.message.create({
        data: {
          receiverId,
          senderId,
          content: content ?? "",
          ...(attachment && { attachment }),
        },
      });

      io.to([receiverId, senderId]).emit("receive_message", message);
    } catch (err) {
      if (!isProduction) {
        console.error("[socket:send_message]", err);
      }
      socket.emit("error", { message: "Failed to send message" });
    }
  });

  socket.on("typing", (receiverId: string) => {
    if (typeof receiverId !== "string" || !receiverId) return;
    socket.to(receiverId).emit("typing", userId);
  });

  socket.on("stop_typing", (receiverId: string) => {
    if (typeof receiverId !== "string" || !receiverId) return;
    socket.to(receiverId).emit("stop_typing", userId);
  });

  socket.on("seen", async (receiverId: string) => {
    if (typeof receiverId !== "string" || !receiverId) return;
    try {
      const senderId = userId;

      await prisma.message.updateMany({
        where: {
          senderId: receiverId,
          receiverId: senderId,
          seen: false,
        },
        data: {
          seen: true,
        },
      });

      io.to(receiverId).emit("seen", { senderId });
    } catch (err) {
      if (!isProduction) {
        console.error("[socket:seen]", err);
      }
    }
  });
});

if (isProduction) {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Order matters: unmatched routes, then the centralized error handler.
app.use(notFoundHandler);
app.use(errorHandler);

server.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
