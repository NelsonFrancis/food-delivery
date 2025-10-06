import userModel from '../models/user.model.js';

const addToCart = async (req, res) => {
    const {userId, item} = req.body
    try {
        const userData = await userModel.findById(userId);
        const cartData = userData.cartData;
        if(!cartData[item]){
            cartData[item] = 1
        }else{
            cartData[item] += 1
        }
        await userModel.findByIdAndUpdate(userId, {cartData});
        res.json({success: true, message: "Added to cart"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error in adding to cart"});
    }
}


const removeFromCart = async (req, res) => {
    const {userId, item} = req.body;
    try {
        const userData = await userModel.findById(userId);
        const cartData = userData.cartData;
        if(!cartData[item]){
            return res.json({success: false, message: "No such item found in cart"});
        }else{
            cartData[item] -= 1
        }
        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success: true, message: "Item removed from cart"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error while removing item from cart"});
    }

}


const getCartItems = async (req, res) => {
    console.log("req body",req.body);
    const {userId} = req.body;
    try {
        const userData = await userModel.findById(userId);
        
        res.json({success: true, cartData:userData.cartData, message: "Cart data fetched"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error while fetching cart data"});
    }
}

export {addToCart, removeFromCart, getCartItems}