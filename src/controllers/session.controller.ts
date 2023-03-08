import express, { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import mongoose from "mongoose";
import session from "express-session";
import config from "../config/config";

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
    console.log("Succes");
    // check if password is correct.
    const isMatch = await user[0].comparePassword(password);
    console.log(isMatch);

    if (!isMatch) {
      res.status(403).send("Please try again.");
      return;
    }
    password = user[0].password;
    const userId = user[0]._id;
    console.log("test");

    req.session.authenticated = true;
    req.session.user = {
      username,
      password,
      userId,
    };
    console.log("test1");

    console.log(req.session);
    res.status(200).json(req.session);
    next();
  } catch (error) {
    // console.log("User not found.");
    res.status(404).send("User not found.");
    return;
  }
};
