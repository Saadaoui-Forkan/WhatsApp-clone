import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.routes";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.get("/", (req, res) => {
  res.send("Hello From Server");
});

app.use('/api/users', userRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

