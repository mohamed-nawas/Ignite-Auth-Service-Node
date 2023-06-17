import express from "express";
import { AuthController } from "../controllers/AuthController";

const AuthRouter = express.Router();
const authController = new AuthController();

AuthRouter.post("/register", authController.register);
AuthRouter.post("/login", authController.login);

export default AuthRouter;