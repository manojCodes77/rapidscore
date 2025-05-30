import express from "express";
import "dotenv/config";
import connectDB from "./config/db";
import cors from "cors";
import userRoutes from "./routes/user-routes"; 

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/auth", userRoutes);

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
