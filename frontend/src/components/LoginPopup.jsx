import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets';
import { toast } from 'react-toastify'
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({setShowLogin}) => {
    const {token, setToken} = useContext(StoreContext);
    const [currentState, setCurrentState] = useState("Sign up");
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData(data => ({...data, [name]: value}))
    }

    const onLogin = async (e) => {
        e.preventDefault();
        setLoader(true);
        let apiUrl
        if(currentState === "Login"){
            if(data.email === "" || data.password === ""){
                toast.error("All fields are required");
                setLoader(false);
                return;
            }
            apiUrl = `${import.meta.env.VITE_URL}/api/user/loginUser`
        }else{
            if(data.name === "" || data.password === "" || data.email === ""){
                toast.error("All fields are required");
                setLoader(false);
                return;
            }
            apiUrl = `${import.meta.env.VITE_URL}/api/user/registerUser`
        }

        const res = await axios.post(apiUrl, data);
        if(res.data.success){
            setLoader(false);
            setToken(res.data.token);
            localStorage.setItem("token", res.data.token);
            setShowLogin(false);
            toast.success("Welcome");
        }else{
            setLoader(false);
            toast.error(res.data.message);
        }
    }
    
  return (
    <>
         {loader && <div className="loader_wrap">
            <img src={assets.loader} className='loader' alt='loading'/>     
        </div>}
  
        <div className='login-popup'>
            <form className="login-popup-container" onSubmit={onLogin}>
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img src={assets.cross_icon} onClick={() => setShowLogin(false)} />
                </div>
                <div className="login-popup-input">
                    {currentState === "Login" ? <></> : <input name="name" type='text' onChange={onChangeHandler} value={data.name} placeholder='Your name' required/>}             
                    <input name="email" type='email' onChange={onChangeHandler} value={data.email} placeholder='Your email' required/>
                    <input name="password" type='password' onChange={onChangeHandler} value={data.password} placeholder='Your password' required/>
                </div>
                <button type="submit">{currentState === "Sign up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type='checkbox' required />
                    <p>By continuing, i agree to the terms of use & privacy policy</p>
                </div>
                {
                    currentState === "Login" 
                    ? <p>Create a new account? <span onClick={() => setCurrentState("Sign up")}>Click here</span> </p> 
                    : <p>Already have account? <span onClick={() => setCurrentState("Login")}>Login here</span> </p>
                }
                
            </form>
        </div>
    </>
  )
}

export default LoginPopup