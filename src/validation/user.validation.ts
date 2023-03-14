import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";

import { z } from "zod";

export const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userSchema.parseAsync(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(500).json(error.issues);
    } else {
      res.status(500).json(error);
    }
  }
};

const userSchema = z
  .object({
    username: z
      .string()
      .min(2)
      .max(25)
      .refine(async (username) => await User.find({ username: username })),
    password: z.string().min(5).max(50),
    passwordCheck: z.string().min(5).max(50),
  })
  .refine((data) => data.password == data.passwordCheck, {
    message: "Password don't match.",
  });

export type userSchema = z.infer<typeof userSchema>;

/** */

export const validateUserUpdate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userUpdateSchema.parseAsync(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(500).json(error.issues);
    } else {
      res.status(500).json(error);
    }
  }
};

const userUpdateSchema = z.object({
  username: z.string().optional(),
});

export type userUpdateSchema = z.infer<typeof userUpdateSchema>;
