import User from "../models/users.model.js";
import bcrypt from "bcrypt";
import { userValidation } from "../validators/user.validators.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../services/user.services.js";
import jwt from "jsonwebtoken";
import env from "../config/env.js";


export async function signUp(req, res) {
  const body = req.body;
  // checks if there is a request body
  if (!body) {
    return res.status(400).json({ detail: "Request body is required" });
  }

  const { error, value } = userValidation.validate(body, { abortEarly: false });

  if (error) {
    return res.status(400).send({ detail: error.message });
  }
  // console.log(value);

  const { fullName, email, username, password } = value;

  //  checking if the email exists
  const emailExistUser = await User.findOne({ email: email });
  if (emailExistUser) {
    return res.status(409).json({ detail: "Email already exists" });
  }
  //  checking if the username exists
  const usernameExistUser = await User.findOne({ username: username });
  if (usernameExistUser) {
    return res.status(409).json({ detail: "Username already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      fullName,
      email,
      username,
      password: hashedPassword,
    });

    const { password: removedPassword, ...modifiedUser } = user.toObject();

    // console.log(password);
    // console.log(removedPassword);

    return res.json({
      message: "Account Creation Successful",
      user: modifiedUser,
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({ detail: "something went Wrong: " + err.message });
  }
}

export async function getAllUsers(req, res) {
  try {
    const allUsers = await User.find();
    return res.json({ allUsers });
  } catch (err) {
    res.status(500).send({ detail: "something went Wrong: " + err.message });
  }
}

export async function signIn(req, res) {
  const body = req.body;
  if (!body) {
    return res.status(400).json({ detail: "Request body is required" });
  }

  const { email, password } = body;

  if (!(email && password)) {
    return res.status(400).json({
      detail: "All fields are required",
      fields: ["password", "email"],
    });
  }

  try {
    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      return res.status(400).json({ detail: "Invalid login credentials" });
    }

    // checking if password is correct....................
    const isCorrect = await user.compareHashedPassword(password);
    if (!isCorrect) {
      return res.status(400).json({ detail: "Invalid login credentials" });
    }
    // console.log(user);

    const tokens = {
      accessToken: generateAccessToken(user),
      refreshToken: generateRefreshToken(user),
    };

    res.json(tokens);
  } catch (err) {
    res.status(500).json({ detail: "something went Wrong: " + err.detail });
  }
}

export async function getUserRole(req, res) {
  const user = req.user;
  const { role: userRole } = user;

  res.json(userRole);
}

export async function refreshAccessToken(req, res) {
  if (!req.body) {
    return res.status(400).json({ detail: "No request body sent " });
  }

  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res
      .status(400)
      .send({ detail: "refreshToken not available in request body" });
  }
  try {
    const decodeUser = jwt.verify(refreshToken, env.JWT_REFRESH_KEY);
    // console.log(decodeUser);
    const { userId } = decodeUser;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ detail: "User not found" });
    }
    const token = generateAccessToken(user);
    return res.json({ accessToken: token });
  } catch (err) {
    return res
      .status(401)
      .json({ detail: "Invalid Refresh Token " + err.message });
  }
}

export async function refreshTokens(req, res) {
  if (!req.body) {
    return res.status(400).json({ detail: "No request body sent " });
  }

  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res
      .status(400)
      .send({ detail: "refreshtoken not available in request body" });
  }

  try {
    const decodeUser = jwt.verify(refreshToken, env.JWT_REFRESH_KEY);
    // console.log(decodeUser);
    const { userId } = decodeUser;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ detail: "User not found" });
    }
    const token = {
      accessToken: generateAccessToken(user),
      refreshToken: generateRefreshToken(user),
    };
    return res.json({ token });
  } catch (err) {
    return res
      .status(401)
      .json({ detail: "Invalid Refresh Token " + err.message });
  }
}
