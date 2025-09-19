import express from "express";
import { AuthController } from "../controllers/auth.controller";

const authController = new AuthController();
const authRouter = express.Router();

authRouter.post('/login', authController.login);

authRouter.post('/signup', authController.signup);


export default authRouter;