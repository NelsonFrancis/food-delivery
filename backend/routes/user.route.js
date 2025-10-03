import { loginUser, registerUser } from "../controllers/user.controller.js";
import express from 'express';

const userRouter = express.Router();

userRouter.post("/registerUser", registerUser);
userRouter.post("/loginUser", loginUser);

export default userRouter