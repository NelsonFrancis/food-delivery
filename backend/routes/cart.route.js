import { addToCart, removeFromCart, getCartItems } from "../controllers/cart.controller.js";
import express from 'express';
import verifyUser from "../middleware/auth.middleware.js";

const cartRouter = express.Router();

cartRouter.post("/addToCart", verifyUser, addToCart);
cartRouter.post("/removeFromCart", verifyUser, removeFromCart);
cartRouter.post("/getCartItems", verifyUser, getCartItems);

export default cartRouter