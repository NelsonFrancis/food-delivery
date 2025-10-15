import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const navigate = useNavigate();
    console.log("verify loaded");
    const verifyPayment = async () => {
        const res = await axios.post(`${import.meta.env.VITE_URL}/api/order/verify`, {success, orderId});
        console.log(res.data);
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