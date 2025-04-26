import express from "express";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 5001;

dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello Chat");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
