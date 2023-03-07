import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const validateUpdatePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    updatePasswordSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(500).json(error.issues);
      return;
    } else {
      res.status(500).json(error);
      return;
    }
  }
};

const updatePasswordSchema = z
  .object({
    oldPassword: z.string(),
    newPassword: z.string(),
    newPasswordCheck: z.string(),
  })
  .refine((data) => data.newPassword == data.newPasswordCheck, {
    message: "Password don't match.",
  });

export type updatePasswordSchema = z.infer<typeof updatePasswordSchema>;
