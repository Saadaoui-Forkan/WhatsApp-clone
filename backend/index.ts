import express from "express";
import 'dotenv/config';
import cors from "cors";
import userRouter from "./routes/userRoute";
import profileRouter from "./routes/profileRoute";
import passwordRouter from "./routes/passwordRoute";

// dotenv.config();

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
app.use('/api/profile', profileRouter)
app.use('/api/users/password', passwordRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

