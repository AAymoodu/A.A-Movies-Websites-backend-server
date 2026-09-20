import express from "express";
import morgan from "morgan";
import router from "./routes/index.js";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors())
app.use("/", router);

export default app;
