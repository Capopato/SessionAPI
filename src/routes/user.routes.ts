import express from "express";
import { deleteAllUsers, deleteUser, readAllUsers, readUser, updatePassword, updateUser } from "../controllers/user.controller";
import { validateUserUpdate } from "../utils/user.validation";
import { validateUpdatePassword } from "../utils/updatePassword.util";

const userRoutes = express.Router();

userRoutes.put("/update/:userId", validateUserUpdate, updateUser);
userRoutes.put("/updatePassword/:userId", validateUpdatePassword, updatePassword);
userRoutes.get("/read/:userId", readUser);
userRoutes.get("/read-all", readAllUsers);
userRoutes.delete("/delete/:userId", deleteUser);
userRoutes.delete("/delete-all", deleteAllUsers);

export default userRoutes;
