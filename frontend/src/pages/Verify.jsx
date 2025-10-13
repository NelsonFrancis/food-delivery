import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    console.log(success, orderId, import.meta.env.VITE_URL);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const res = await axios.post(`${import.meta.env.VITE_URL}/api/order/verify`, {success, orderId});
        if(res.data.success){
            navigate("/myorders")
        }else{
            navigate("/")
        }
    }

    useEffect(() => {
        verifyPayment();
    },[])
  return (
    <div className='verify'>
        <p>VErify</p>
        <div className="spinner"></div>
    </div>
  )
}

export default Verify