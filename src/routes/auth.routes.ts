import express from "express";
import passport from "passport";
import { validateUser } from "../utils/user.validation";
import { signupUser } from "../controllers/session.controller";

const authRoutes = express.Router();

authRoutes.post("/signup", validateUser, signupUser);
authRoutes.post("/login");

export default authRoutes;
