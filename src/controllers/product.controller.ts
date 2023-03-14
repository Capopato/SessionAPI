import { Request, Response, NextFunction } from "express";
import Product from "../models/product.model";
import mongoose from "mongoose";

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;

  const product = new Product({
    id: new mongoose.Types.ObjectId(),
    title,
    description,
    price,
  });

  product.save();
  res.status(200).json({ product });
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {};

export const readProduct = async (req: Request, res: Response, next: NextFunction) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findById(productId);
    res.status(200).json({ product });
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const readAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json({ allProducts });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findByIdAndDelete(productId);
    res.status(200).send("Product is deleted.");
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const deleteAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allProducts = await Product.deleteMany();
    res.status(200).send("All products are deleted");
  } catch (error) {
    res.status(500).json({ error });
  }
};
