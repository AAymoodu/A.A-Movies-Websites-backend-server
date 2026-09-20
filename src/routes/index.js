import { Router } from "express";
import userRouter from "../routes/user.routes.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Thank God this shit is working" });
});

router.use("/users", userRouter);
export default router;
