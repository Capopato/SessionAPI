import { Request, Response, NextFunction } from "express";
import { store } from "..";
import User from "../models/user.model";
import mongoose from "mongoose";

export const signupUser = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  const user = new User({
    id: new mongoose.Types.ObjectId(),
    // email,
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
  console.log(store);
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (req.session.authenticated) {
      res.json(req.session);
    } else {
      if (password == "123") {
        req.session.authenticated = true;
        req.session.user = {
          username,
          password,
        };
        res.status(200).json(req.session);
      } else {
        res.status(403).json({ message: "Bad request" });
      }
    }
  }
};
