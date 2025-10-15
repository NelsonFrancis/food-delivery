import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";
import Stripe from "stripe";

const placeOrder = async (req, res) => {
    const { userId, items, amount, address } = req.body;

    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        const newOrder = new orderModel({
            userId, items, amount, address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        const line_items = items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        line_items.push({
            price_data: {
                currency: "usd",
                product_data: { name: "Delivery charges" },
                unit_amount: 500, // add unit_amount
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error placing order" });
    }
};

const verifyOrder = async (req, res) => {
    const {success, orderId} = req.body;

    try {
        if(success == "true"){
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            res.json({success: true, message: "Paid"});
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success: false, message: "Not paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}


const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({userId: req.body.userId});
        res.json({success: true, data: orders});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}


const getAllUserOrders = async (req, res) => {
  try {
      const allOrders = await orderModel.find({});
      res.json({success: true, data: allOrders})
  } catch (error) {
    console.log(error);
    res.json({success: false, message: "Error in fetching orders"})
  }
}


const updateOrderStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
        res.json({success: true, message: "Status updated"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error in updating status"});
    }
}

export { placeOrder, verifyOrder, userOrders, getAllUserOrders, updateOrderStatus };
