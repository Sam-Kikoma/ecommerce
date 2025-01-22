import { Router } from "express";
import { signUp, login } from "../controllers/auth";

const authRoutes: Router = Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/login", login);

export default authRoutes;
