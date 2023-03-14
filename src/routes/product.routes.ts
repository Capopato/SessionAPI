import express from "express";
import { createProduct, deleteAllProducts, deleteProduct, readAllProducts, readProduct, updateProduct } from "../controllers/product.controller";
import { productValidation, updateValidation } from "../validation/product.validation";
import { deserializeUser } from "../middleware/deserializeUser.middleware";

export const productRoutes = express.Router();

productRoutes.post("/create", deserializeUser, productValidation, createProduct);
productRoutes.put("/update/:productId", deserializeUser, updateValidation, updateProduct);
productRoutes.get("/read/:productId", deserializeUser, readProduct);
productRoutes.get("/read-all", deserializeUser, readAllProducts);
productRoutes.delete("/delete/:productId", deserializeUser, deleteProduct);
productRoutes.delete("/delete-all", deserializeUser, deleteAllProducts);
