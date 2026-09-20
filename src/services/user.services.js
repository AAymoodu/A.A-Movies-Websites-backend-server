import jwt from "jsonwebtoken";
import env from "../config/env.js";

export function generateAccessToken(user) {
  return jwt.sign(
    {
      userId: user._id.toString(),
      role: user.role,
    },
    env.JWT_ACCESS_KEY,
    { expiresIn: "10m" },
  );
}

export function generateRefreshToken(user) {
  return jwt.sign(
    {
      userId: user._id.toString(),
      role: user.role,
    },
    env.JWT_REFRESH_KEY,
    { expiresIn: "7d" },
  );
}
