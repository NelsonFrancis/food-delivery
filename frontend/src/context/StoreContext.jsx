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

    const addToCart = (itemId) => {
        if(!cartItem[itemId]){
            setCartItem(prev => ({...prev, [itemId]: 1}))
        }else{
            setCartItem(prev => ({...prev, [itemId]: prev[itemId] + 1}))
        }
    }

    const removeFromCart = (itemId) => {
        setCartItem(prev => ({...prev, [itemId]: prev[itemId] - 1}))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItem){
            if(cartItem[item] > 0){
                let itemInfo = foodList.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItem[item];
            }
        }
        return totalAmount
    }

    useEffect(()=>{
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
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