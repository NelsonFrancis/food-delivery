import express from 'express';
import { placeOrder, verifyOrder, userOrders, getAllUserOrders, updateOrderStatus } from "../controllers/order.controller.js";
import verifyUser from "../middleware/auth.middleware.js";

const orderRouter = express.Router();

orderRouter.post("/place", verifyUser, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userOrders", verifyUser, userOrders);
orderRouter.get("/getAllOrders", getAllUserOrders);
orderRouter.post("/updateStatus", updateOrderStatus);

export default orderRouter;