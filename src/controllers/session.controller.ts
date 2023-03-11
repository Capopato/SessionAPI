import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import mongoose from "mongoose";
import session from "express-session";
import config from "../config/config";
import { v4 as uuidv4 } from "uuid";
import { signJWT, validateJWT } from "../utils/jwt.utils";

export const store = new session.MemoryStore();

export const signupUser = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  const user = new User({
    id: new mongoose.Types.ObjectId(),
    username,
    password,
  });

  try {
    await user.save();
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const loginSession = async (req: Request, res: Response, next: NextFunction) => {
  const username = req.body.username;
  let password = req.body.password;

  // const user = await User.find({ username: username });
  const findUser = await User.find({ username: username });

  try {
    const user = await User.findById(findUser[0].id);
    if (!user) {
      return next();
    }
    // check if password is correct.
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(403).send("Please try again.");
    }

    password = user.password;
    const userId = user._id;
    const sessionId = uuidv4();

    req.session.authenticated = true;
    req.session.user = {
      sessionId,
      username,
      password,
      userId,
    };
    const accessToken = signJWT({ ...user });
    const refreshToken = signJWT({ ...user });

    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        expires: config.accessTokenLt,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        expires: config.refreshTokenLt,
      })
      .status(200)
      .json({ accessToken, refreshToken });
  } catch (error) {
    return res.status(404).send("User not found.");
  }
};

export const logoutSession = async (req: Request, res: Response, next: NextFunction) => {
  /**
   * Check if there is an active session. If yes then
   */
  res.status(200).send("Ok");
  next();
};
