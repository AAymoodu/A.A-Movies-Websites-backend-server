import { Router } from "express";
import userRouter from "../routes/user.routes.js";
import mediaRouter from "../routes/media.route.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Thank God this shit is working" });
});

router.use("/users", userRouter);
router.use("/media", mediaRouter);
export default router;
