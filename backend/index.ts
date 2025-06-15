import express from "express";
import 'dotenv/config';
import cors from "cors";
import userRouter from "./routes/userRoute";
import profileRouter from "./routes/profileRoute";
import passwordRouter from "./routes/passwordRoute";
import http from "http";
import { Server } from "socket.io"

const app = express();
const server = http.createServer(app)
const PORT = process.env.PORT || 5001;
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_DOMAIN_URL,
    credentials: true
  }
})

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

io.on("connection", (socket) => {
  console.log("connected user: ", socket)

  socket.on("disconnected", () => {
    console.log("disconnected user: ", socket.id)
  })
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

