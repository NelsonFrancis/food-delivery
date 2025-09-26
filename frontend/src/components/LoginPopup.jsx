import React, { useState } from 'react'
import { assets } from '../assets/assets';

const LoginPopup = ({setShowLogin}) => {
    const [currentState, setCurrentState] = useState("Sign up");
  return (
    <div className='login-popup'>
        <form className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img src={assets.cross_icon} onClick={() => setShowLogin(false)} />
            </div>
            <div className="login-popup-input">
                {currentState === "Login" ? <></> : <input type='text' placeholder='Your name' required/>}             
                <input type='email' placeholder='Your email' required/>
                <input type='password' placeholder='Your password' required/>
            </div>
            <button>{currentState === "Sign up" ? "Create account" : "Login"}</button>
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
  )
}

export default LoginPopup