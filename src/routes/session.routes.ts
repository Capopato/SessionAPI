import express from "express";
import { loginSession, logoutSession, signupUser } from "../controllers/session.controller";
import { validateUser } from "../utils/user.validation";
import { deserializeUser } from "../middleware/deserializeUser.middleware";

const sessionRoutes = express.Router();

sessionRoutes.post("/signup", validateUser, signupUser);
sessionRoutes.post("/login", loginSession);
sessionRoutes.get("/logout", logoutSession);

export default sessionRoutes;
