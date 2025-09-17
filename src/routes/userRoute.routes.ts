import express from "express"
import { UserController } from "../controllers/userController.control";


const userController = new UserController();
const userRouter = express.Router();

userRouter.get("/allusers", userController.getAllUsers);
userRouter.get("/getuser/:id", userController.getUserbyId);
userRouter.put("/updateuser/:id", userController.updateUser)
userRouter.delete("/deleteuser/:id", userController.deleteUser)

export default userRouter;