import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/userRoute";
import { productsRouter } from "./routes/productsRoute";

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);
mongoose.connect("mongodb://localhost:27017").catch((error) => {
  console.log(error);
});

app.use("/user", userRouter);
app.use("/products", productsRouter);
app.listen(3001, () => {
  console.log("server running on 3001");
});
