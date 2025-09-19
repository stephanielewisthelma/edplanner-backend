import express from "express"
import { UserController } from "../controllers/userController.control";
import { authenticateUser } from "../middlewares/auth.middleware";


const userController = new UserController();
const userRouter = express.Router();

userRouter.get("/allusers", authenticateUser, userController.getAllUsers);
userRouter.get("/getuser/:id", authenticateUser, userController.getUserbyId);
userRouter.put("/updateuser/:id", authenticateUser, userController.updateUser);
userRouter.delete("/deleteuser/:id", authenticateUser, userController.deleteUser);
userRouter.post("/newtask", authenticateUser, userController.addNewTask);
userRouter.post("/newcourse", authenticateUser, userController.addNewCourse);

export default userRouter;