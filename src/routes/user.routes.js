import { Router } from "express";
import {
  signUp,
  getAllUsers,
  signIn,
  getUser,
  refreshAccessToken,
  refreshTokens,
} from "../controllers/user.controller.js";
import { authenticate } from "../middleware/user.middleware.js";
const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/accesstoken", refreshAccessToken);
router.post("/token", refreshTokens);
router.get("/", getAllUsers);
router.get("/user", [authenticate], getUser);

export default router;
