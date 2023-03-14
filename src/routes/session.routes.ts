import express from "express";
import { loginSession, logoutSession, signupUser } from "../controllers/session.controller";
import { validateUser } from "../validation/user.validation";
import { deserializeUser } from "../middleware/deserializeUser.middleware";

const sessionRoutes = express.Router();

sessionRoutes.post("/signup", validateUser, signupUser);
sessionRoutes.post("/login", deserializeUser, loginSession);
sessionRoutes.get("/logout", deserializeUser, logoutSession);

export default sessionRoutes;
