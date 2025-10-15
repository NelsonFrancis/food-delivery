import { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { assets } from '../assets/assets';

const Myorders = () => {
    const {token} = useContext(StoreContext);
    const [data, setData] = useState([]);
  
    const fetchOrders = async () => {
        const res = await axios.post(`${import.meta.env.VITE_URL}/api/order/userOrders`, {}, {headers: {token}});
        setData(res.data.data);
    }

    useEffect(() => {
        if(token){
            fetchOrders();
        }
    },[token, data])
    
  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
            {data.length === 0 ? <p>No orders found</p>: 
                data.map((order, index)=>{
                    return(
                        <div key={index} className='my-orders-order'>
                            <img src={assets.parcel_icon} alt='img' />
                            <p>{order.items.map((item, index) => {
                                if(index === order.items.length - 1){
                                    return item.name + "x" + item.quantity
                                }else{
                                     return item.name + "x" + item.quantity + ", "
                                }
                            })}</p>
                            <p>{order.amount}</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span><b>{order.status}</b></p>
                            <button>Track order</button>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Myorders