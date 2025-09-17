import express from "express"
import { UserController } from "../controllers/userController.control";
import { AuthController } from "../controllers/auth.controller";
const userController = new UserController();
const authController = new AuthController()
const userRouter = express.Router();

userRouter.post("/", userController.registerUser);
userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserbyId);
userRouter.post("/", authController.login)
userRouter.put("/:id", userController.updateUser)
userRouter.delete("/:id", userController.deleteUser)

export default userRouter;