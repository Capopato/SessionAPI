import { z } from "zod";
import { NextFunction, Request, Response } from "express";

export const productValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    productValidationSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(422).json({ error });
    }
  }
};

const productValidationSchema = z.object({
  title: z.string().min(3).max(25),
  description: z.string().min(5).max(150),
  price: z.number(),
});

export type productValidationSchema = z.infer<typeof productValidationSchema>;

export const updateValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    updateValidationSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(422).json({ error });
    }
  }
};

const updateValidationSchema = z.object({
  title: z.string().min(3).max(25).optional(),
  description: z.string().min(5).max(150).optional(),
  price: z.number().optional(),
});

export type updateValidationSchema = z.infer<typeof updateValidationSchema>;
