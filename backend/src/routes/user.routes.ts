import { Router } from "express";
import userController from "../controllers/user.controller";
import { authJWT } from "../middleware/auth";

const userRouter = Router();

userRouter.post("/signup", userController.addUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/auth", authJWT, userController.checkAuth);
userRouter.get("/", userController.getUsers);
userRouter.get("/name/:username", userController.getUserByUsername);
userRouter.get("/:id", userController.getUserById);
userRouter.put("/:id", userController.updateUserById);
userRouter.delete("/:id", userController.deleteUserById);

export default userRouter;
