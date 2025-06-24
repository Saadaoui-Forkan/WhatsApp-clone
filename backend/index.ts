import express from "express";
import 'dotenv/config';
import cors from "cors";
import userRouter from "./routes/userRoute";
import profileRouter from "./routes/profileRoute";
import passwordRouter from "./routes/passwordRoute";
import http from "http";
import { Server } from "socket.io"
import { isAuth, isSocketAuth } from "middlewares/auth";
import messageRouter from "routes/messageRoute";
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
app.use(cors({
  origin: process.env.CLIENT_DOMAIN_URL,
  credentials: true,
}));

app.get("/", (req, res) => {
  res.send("Hello From Server");
});

app.use('/api/users', userRouter)
app.use('/api/profile', profileRouter)
app.use('/api/users/password', passwordRouter)
app.use('/api/messages', isAuth, messageRouter)

io.on("connection", (socket) => {
  console.log("connected user: ", socket.data.userInfo)

  socket.on("disconnected", () => {
    console.log("disconnected user: ", socket.id)
  })

  const userId = socket.data.userInfo.id;
  socket.join(userId);
  socket.on("send_message", async({receiverId, content}) => {
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
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

