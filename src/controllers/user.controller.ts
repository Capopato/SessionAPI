import e, { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.cookie) {
    // console.log(req.session);
    if (req.session.cookie.expires && Date.now() > req.session.cookie.expires.getTime()) {
      console.log(req.session);
      res.status(440).json("Session expired.");
      return;
    }
  } else {
    if (!req.session) {
      res.status(440).json("Session expired.");
    }
  }

  const userId = req.params.userId;
  const update = req.body;

  if (req.body.password || req.body.passwordCheck) {
    console.log("Not possible to update password. Please use: /updatePassword");
    res.status(500).send("Not possible to update password. Please use: /updatePassword");
    return;
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).send("User not found.");
      return;
    }

    user.set(update);
    user.save();
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.oldPassword) {
    console.log("Only password allowed.");
    res.status(500).send("Only password allowed.");
    return;
  }

  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send("User not found.");
      return;
    }
    // const newHashPassword = await user.hashPassword(req.body.newPassword);
    const isMatch = await user.comparePassword(await req.body.oldPassword);

    console.log(isMatch);

    if (!isMatch) {
      res.status(401).send("Incorrect password.");
      return;
    }

    // user.password = newHashPassword;
    console.log(user);
    user.set(user.password);
    user.save();
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const readUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send("User not found.");
      return;
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const readAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const all = await User.find();
    res.status(200).json({ all });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(404).send("User not found.");
      return;
    }
    res.status(200).send("User is deleted.");
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const all = await User.deleteMany();
    res.status(200).send("All users deleted from database.");
  } catch (error) {
    res.status(500).json({ error });
  }
};
