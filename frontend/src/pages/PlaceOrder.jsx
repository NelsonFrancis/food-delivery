import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const {getTotalCartAmount, token, foodList, cartItem, url} = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData(data => ({...data, [name]: value}));

  }

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    foodList.map((item) => {
      if(cartItem[item._id]>0){
        let itemInfo = item; 
        itemInfo["quantity"] = cartItem[item._id]
        orderItems.push(itemInfo)
      }
    })
    console.log("orderItems", orderItems)
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    }
    let response = await axios.post(`${import.meta.env.VITE_URL}/api/order/place`, orderData, {headers: {token}})
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }else{
      alert("error");
    }
  }

  useEffect(() => {
    console.log("token", token)
    if(!token){
      navigate("/cart")
    }else if(getTotalCartAmount() === 0){
      navigate("/cart")
    }
  },[token])
  return (
    <>
    {
        getTotalCartAmount() === 0 
        ? <p className='no-items'>Oops!! No items in cart</p> 
        : <>
    <form className='place-order' onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input type="text" name="firstName" onChange={onChangeHandler} value={data.firstName} placeholder='First name'/>
          <input type="text" name="lastName" onChange={onChangeHandler} value={data.lastName} placeholder='Last name' />
        </div>
        <input type="text" name="email" onChange={onChangeHandler} value={data.email} placeholder='Email id'/>
        <input type="text" name="street" onChange={onChangeHandler} value={data.street} placeholder='Street' />
        <div className="multi-fields">
          <input type="text" name="city" onChange={onChangeHandler} value={data.city} placeholder='City'/>
          <input type="text" name="state" onChange={onChangeHandler} value={data.state} placeholder='State' />
        </div>
        <div className="multi-fields">
          <input type="text" name="zipcode" onChange={onChangeHandler} value={data.zipcode} placeholder='Zipcode'/>
          <input type="text" name="country" onChange={onChangeHandler} value={data.country} placeholder='Country' />
        </div>
        <input type='text' name="phone" onChange={onChangeHandler} value={data.phone} placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="submit">Proceed to payment</button>
        </div>
      </div>
    </form>
    </>
    }
    </>
  )
}

export default PlaceOrder