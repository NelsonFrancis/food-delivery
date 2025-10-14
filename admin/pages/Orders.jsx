import React, {useState} from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import {assets} from '../src/assets/assets.js'

const Orders = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(`${import.meta.env.VITE_URL}/api/order/getAllOrders`);
    if(res.data.success){
      setData(res.data.data);
      console.log(res.data);
    }else{
      console.log("Error in fetching orders",res.data.message);
      toast.error("Error in fetching orders");
    }
  }

  const statusHandler = async (e, orderId) => {
    console.log(orderId)
    const res = await axios.post(`${import.meta.env.VITE_URL}/api/order/updateStatus`, {
      orderId,
      status: e.target.value
    })
    console.log(res)
    if(res.data.success){
      await fetchData();
    }else{
      console.log("Error in updating status");
      toast.error("Error in updating status");
    }
  }

  useEffect(() => {
    fetchData();
  },[])

  return (
    <div className='order add'>
      <h3>Orders</h3>
      <div className="order-list">
        {
          data.map((order, index) => (
           <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt='img' />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    if(index === order.items.length-1){
                      return item.name + " x " + item.quantity
                    }else{
                      return item.name + " x " + item.quantity + ","
                    }
                  })}
                </p>
                <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
                <div className="order-item-address">
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                </div>
                  <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <div>
                <p>Items: {order.items.length}</p>
                <p>Amount: ${order.amount}</p>
              </div>
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                <option value="Food processing">Food processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
           </div> 
          ))
        }
      </div>
    </div>
  )
}

export default Orders