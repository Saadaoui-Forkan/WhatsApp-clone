import express, { Request, Response } from "express";
import 'dotenv/config';
import cors from "cors";
import userRouter from "./routes/userRoute";
import profileRouter from "./routes/profileRoute";
import passwordRouter from "./routes/passwordRoute";
import http from "http";
import { Server, Socket } from "socket.io"
import { isAuth, isSocketAuth } from "./middlewares/auth";
import messageRouter from "./routes/messageRoute";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
const server = http.createServer(app)
const PORT = process.env.PORT || 5001;
export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_DOMAIN_URL,
    credentials: true
  }
})

io.use(isSocketAuth)

app.use(express.json());
// app.use(cors({
//   origin: process.env.CLIENT_DOMAIN_URL,
//   credentials: true,
// }));
const allowedOrigins = [
  process.env.CLIENT_DEVELOPMENT_DOMAIN, 
  process.env.CLIENT_PRODUCTION_DOMAIN,  
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        // Allow request
        callback(null, true);
      } else {
        // Block request from unknown origin
        console.warn(`⚠️ CORS blocked request from origin: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow sending cookies with requests (important for auth)
  })
);

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
        senderId,
        receiverId,
        seen: false,
      },
      data: {
        seen: true,
      },
    });

    io.emit("seen", senderId)
  })
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

