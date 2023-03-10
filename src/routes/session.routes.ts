import express from "express";
import { loginSession, signupUser } from "../controllers/session.controller";
import { validateUser } from "../utils/user.validation";

const sessionRoutes = express.Router();

sessionRoutes.post("/signup", validateUser, signupUser);
sessionRoutes.post("/login", loginSession);

export default sessionRoutes;
