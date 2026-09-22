import jwt from "jsonwebtoken";
import env from "../config/env.js";
import User from "../models/users.model.js";

export async function authenticate(req, res, next) {
  const authorization = req.headers.authorization;
  //   checks that there is an authorization
  if (!authorization) {
    return res.status(401).send({ detail: "No authorization header" });
  }

  //   checks that it is a bearer token
  if (!authorization.startsWith(`Bearer `)) {
    return res.status(401).send({ detail: "Bearer Token is required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decodedUser = jwt.verify(token, env.JWT_ACCESS_KEY);
    const userId = decodedUser.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).send({ detail: "Invalid  or Expired token" });
    }

    req.user = user.toObject();

    next();
  } catch (err) {
    return res.status(401).send({ detail: "Invalid  or Expired token" });
  }
}

export async function adminsOnly(req, res, next) {
  if (!req.user) {
    return res
      .status(401)
      .json({ detail: "You are not allowed to access this resource" });
  }

  if (req.user.role != "admin") {
    return res
      .status(401)
      .json({ detail: "You are not allowed to access this resource" });
  }

  next();
}