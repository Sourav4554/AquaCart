import React, { useState, useEffect, useContext } from "react";
import {toast} from 'react-toastify'
import axios from 'axios';
import "./otpContainer.css";
import { InputOtp } from "primereact/inputotp";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../Context/ProductContext";


const OtpContainer = ({email,setShowOtpContainer}) => {
const navigate=useNavigate();
const{backendUrl,createToken}=useContext(ProductContext)
// Initial time: 120 seconds (2 minutes)
const [timeLeft, setTimeLeft] = useState(120); 
//manage otp
const[otp,setOtp]=useState('');

//function for resend otp
const resendOtp=async()=>{
  if (timeLeft === 0) {
    setTimeLeft(120); 
  }
try {
const{data}=await axios.post(`${backendUrl}/api/user/resend-otp`,{email});
if(data.success){
toast.success(data.message)
}
else{
toast.error(data.message)
}
} catch (error) {
  console.error(error.response ? error.response.data : error.message);
  toast.error(error.response.data.message)
}
}

//function for verify email
  const submitOtp=async()=>{
  try {
    const {data}=await axios.post(`${backendUrl}/api/user/verify-email`,{email,verifyOtp:otp})
    if(data.success){
    setShowOtpContainer(false)
    navigate('/');
    createToken(data.token)
    sessionStorage.setItem('token',data.token);
    window.location.reload()
    }
    else{
    toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.response.data.message)
    console.error(error.response ? error.response.data : error.message);
  }
  }
  // Countdown logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer); 
    }
  }, [timeLeft]);

  // Format timeLeft as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;};

  return (
    <div className="otp-container">
      <h3>Enter OTP</h3>
      <InputOtp length={6} autoFocus className="otp-input" onChange={(e)=>{setOtp(e.value)}} value={otp}/>
      <button className="otp-submit-btn" onClick={submitOtp}>Submit OTP</button>
      <p>
        Didn't receive the code?{" "}
        <span className={`resend-link ${timeLeft > 0 ? "disabled" : ""}`}
          onClick={() => {resendOtp()}}>  Resend OTP
        </span>
      </p>
      <p className="timer">Time left: {formatTime(timeLeft)}</p>
    </div>
  );
};

export default OtpContainer;
