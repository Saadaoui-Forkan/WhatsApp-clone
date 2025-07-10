import express, { Request, Response } from "express";
import 'dotenv/config';
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import profileRouter from "./routes/profileRoute.js";
import passwordRouter from "./routes/passwordRoute.js";
import http from "http";
import { Server, Socket } from "socket.io"
import { isAuth, isSocketAuth } from "./middlewares/auth.js";
import messageRouter from "./routes/messageRoute.js";
import { PrismaClient } from "@prisma/client";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

const app = express();
const server = http.createServer(app)
const PORT = process.env.PORT || 5001;

const allowedOrigins = [
  process.env.CLIENT_DEVELOPMENT_DOMAIN,
  process.env.CLIENT_PRODUCTION_DOMAIN,
].filter(Boolean) as string[]

// Socket.IO CORS
export const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true
  }
})

io.use(isSocketAuth)

app.use(express.json());

// Express CORS
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello From Server");
});

app.use('/api/users', userRouter)
app.use('/api/profile', profileRouter)
app.use('/api/users/password', passwordRouter)
app.use('/api/messages', isAuth, messageRouter)

type MessagePayload = {
  receiverId: string;
  content: string;
};

io.on("connection", (socket: Socket) => {
  console.log("connected user: ", socket.data.userInfo)
  const userId = socket.data.userInfo.id;
  socket.join(userId);

  socket.on("disconnected", () => {
    console.log("disconnected user: ", socket.id)
  })

  socket.on("send_message", async({receiverId, content}: MessagePayload) => {
    const senderId = userId
    const message = await prisma.message.create({
      data: {
        receiverId,
        senderId,
        content,
      },
    });

    io.to([receiverId, senderId]).emit("receive_message", message)
  })

  socket.on("typing", (receiverId: string) => {
    socket.to(receiverId).emit("typing", userId)
  })

  socket.on("stop_typing", (receiverId: string) => {
    socket.to(receiverId).emit("stop_typing", userId)
  })

  socket.on("seen", async(receiverId: string) => {
    const senderId = userId

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

    io.emit("seen", senderId)
  })
})

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

