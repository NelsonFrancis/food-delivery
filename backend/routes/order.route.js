import express from 'express';
import { placeOrder } from "../controllers/order.controller.js";
import verifyUser from "../middleware/auth.middleware.js";

const orderRouter = express.Router();

orderRouter.post("/place", verifyUser, placeOrder);

export default orderRouter;