import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import mongoose from "mongoose";
import session from "express-session";
import config from "../config/config";
import { uuid as v4 } from "uuidv4";
import { signJWT } from "../utils/jwt.utils";

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

  const user = await User.find({ username: username });

  try {
    await User.findById(user[0].id);
    // check if password is correct.
    const isMatch = await user[0].comparePassword(password);

    if (!isMatch) {
      res.status(403).send("Please try again.");
      return;
    }

    password = user[0].password;
    const userId = user[0]._id;
    const sessionId = v4();

    req.session.authenticated = true;
    req.session.user = {
      sessionId,
      username,
      password,
      userId,
    };

    const accessToken = signJWT({ user, session: sessionId }, config.accessTokenLt);
    const refreshToken = signJWT({ user, session: sessionId }, config.refreshTokenLt);

    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
      })
      .json({ accessToken });
  } catch (error) {
    res.status(404).send("User not found.");
    return;
  }
};
