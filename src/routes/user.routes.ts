import express from "express";
import { deleteAllUsers, deleteUser, readAllUsers, readUser, updatePassword, updateUser } from "../controllers/user.controller";
import { validateUserUpdate } from "../validation/user.validation";
import { validateUpdatePassword } from "../utils/updatePassword.util";
import { deserializeUser } from "../middleware/deserializeUser.middleware";

const userRoutes = express.Router();

userRoutes.put("/update/:userId", deserializeUser, validateUserUpdate, updateUser);
userRoutes.put("/updatePassword/:userId", deserializeUser, validateUpdatePassword, updatePassword);
userRoutes.get("/read/:userId", deserializeUser, readUser);
userRoutes.get("/read-all", deserializeUser, readAllUsers);
userRoutes.delete("/delete/:userId", deserializeUser, deleteUser);
userRoutes.delete("/delete-all", deserializeUser, deleteAllUsers);

export default userRoutes;
