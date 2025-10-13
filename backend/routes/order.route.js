import express from 'express';
import { placeOrder, verifyOrder, userOrders } from "../controllers/order.controller.js";
import verifyUser from "../middleware/auth.middleware.js";

const orderRouter = express.Router();

orderRouter.post("/place", verifyUser, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userOrders", verifyUser, userOrders);

export default orderRouter;