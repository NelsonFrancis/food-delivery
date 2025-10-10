import { createContext, useEffect, useState } from "react";
import axios from 'axios';
// import { food_list } from "../assets/assets";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const [cartItem, setCartItem] = useState({});
    const [token, setToken] = useState("");
    const [foodList, setFoodList] = useState([]);

    const fetchFoodList = async() => {
        const res = await axios.get(`${import.meta.env.VITE_URL}/api/food/allFoods`)
        setFoodList(res.data.data);
        console.log("res = ", res.data.data)
    }

    const addToCart = async (itemId) => {
        if(!cartItem[itemId]){
            setCartItem(prev => ({...prev, [itemId]: 1}))
        }else{
            setCartItem(prev => ({...prev, [itemId]: prev[itemId] + 1}))
        }
        if(token){
            await axios.post(`${import.meta.env.VITE_URL}/api/cart/addToCart`, {item: itemId}, {headers: {token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItem(prev => ({...prev, [itemId]: prev[itemId] - 1}));
        await axios.post(`${import.meta.env.VITE_URL}/api/cart/removeFromCart`, {item: itemId}, {headers: {token}})
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItem){
            if(cartItem[item] > 0){
                let itemInfo = foodList.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItem[item];
                console.log("itemInfo", itemInfo.price)
                console.log("cartItem", cartItem)
            }
        }
        return totalAmount
    }

    const getCartItems = async(token) => {
        const res = await axios.post(`${import.meta.env.VITE_URL}/api/cart/getCartItems`, {}, {headers: {token}});
        setCartItem(res.data.cartData);
    }

    useEffect(()=>{
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            getCartItems(localStorage.getItem("token"));
        }
        fetchFoodList();
    },[])

    const contextValue = {
        foodList,
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider