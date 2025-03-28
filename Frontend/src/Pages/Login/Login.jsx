import React, { useContext, useState } from 'react';
import './Login.css';
import OtpContainer from '../../Component/otpContainer/otpContainer';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../Context/ProductContext';
import {toast} from 'react-toastify'
import axios from 'axios';
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import {googleAuth} from '../../Utilities/api'
const Login = () => {
const{createToken,showOtpContainer,setShowOtpContainer,backendUrl}=useContext(ProductContext)
const navigate = useNavigate();
//manage login signup inputs
const [currState, setCrrState] = useState('Login');
//store signup data
const[loginData,setLoginData]=useState({
name:"",
email:"",
password:""
})

//function for store the input values
const inputFormdata=(event)=>{
const {name,value}=event.target;
setLoginData((prev)=>({...prev,[name]:value}))
}

//function for login signup
const submitHandler=async(event)=>{
  event.preventDefault();
if(currState==='Signup'){
try {
const {data}= await axios.post(`${backendUrl}/api/user/register`,loginData);
if(data.success){
setShowOtpContainer(true);
toast.success(data.message);
}
else{
toast.error(data.message)
}
} catch (error) {
  toast.error(error.response.data.message)
  console.log(error)
}
}
else{
try {
  const {data}=await axios.post(`${backendUrl}/api/user/login`,loginData);
  if(data.success){
  sessionStorage.setItem('token',data.token)
  createToken(data.token)
  navigate('/');
  toast.success(data.message)
  window.location.reload();
  }
  else{
  toast.error(data.message)
  }
} catch (error) {
  toast.error(error.response.data.message)
  console.log(error)
}
}
}

//google authentication
const responseGoogle=async (authResult)=>{
try {
  if(authResult['code']){
    const result = await googleAuth(authResult.code);
    // const{email,password}=result.data.user;
     const {token}=result.data;
     if(token){
      sessionStorage.setItem('token',token)
      createToken(token);
      navigate('/');
      window.location.reload();
    }
  }
} catch (error) {
  console.log(error)
}
}

const googleLogin = useGoogleLogin({
  onSuccess: responseGoogle,
  onError: responseGoogle,
  flow: "auth-code",
})
  return (
    <div className="login-container">
      <div className="login-popup">
        {/* Render OTP container */}
        {showOtpContainer ? (
          <OtpContainer email={loginData.email} setShowOtpContainer={setShowOtpContainer}/>
        ) : (
          <form action="" className="login-popup-container" onSubmit={submitHandler}>
            <div className="login-popup-title">
              <h2>{currState}</h2>
            </div>
            <div className="login-popup-inputs">
              {currState === 'Signup' && <input type="text" placeholder="Your Name"  onChange={inputFormdata} name='name' value={loginData.name}required />}
              <input type="email" placeholder="Your Email"  onChange={inputFormdata} name='email' value={loginData.email} required/>
              <input type="password" placeholder="Password"  onChange={inputFormdata} name='password' value={loginData.password}required />
            </div>
            <button
              type="submit"
             
            >
              {currState === 'Signup' ? 'Create Account' : 'Login'}
            </button>
            {currState === 'Login' && (
            <>
            <button className='google-btn' onClick={(e)=>{
            e.preventDefault();
            googleLogin();
            }}>
            <FcGoogle className="google-icon" />
            Sign in With Google
            </button>
              <p
                className="forgot-password"
                onClick={() => {
                  navigate('/email'); // Navigate to forgot password route
                }}
              >
                Forgot Password?
              </p>
              </>
            )}
            {currState === 'Login' ? (
              <p>
                Create a new Account?{' '}
                <span onClick={() => setCrrState('Signup')}>Click here</span>
              </p>
            ) : (
              <>
                <button className='google-btn' onClick={(e)=>{
                e.preventDefault();
                 googleLogin();
                  }}>
              <FcGoogle className="google-icon" />
              Sign up With Google
              </button>
              <p>
                Already have an Account?{' '}
                <span
                  onClick={() => {
                    setCrrState('Login');
                    setShowOtpContainer(false); // Reset OTP container when switching to login
                  }}
                >
                  Login here
                </span>
              </p>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
