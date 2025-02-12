import React, { useContext, useState } from 'react'
import {toast} from 'react-toastify'
import './Login.css'
import { Materials } from '../../Context/Context'
import axios from 'axios'
const Login = () => {
//store values from the login form
const[loginData,setLoginData]=useState({
email:"",
password:""
})
const{ BackendUrl,createToken,setShowLogin}=useContext(Materials)
//function for store values from frontend
const takeInput=(e)=>{
const{name,value}=e.target;
setLoginData((prev)=>({...prev,[name]:value}))
}
//function for login
const submitForm=async(e)=>{
e.preventDefault()
try {
const {data}=await axios.post(`${BackendUrl}/api/admin/login`,loginData);
if(data.success){
console.log('true')
sessionStorage.setItem('token',data.token)
createToken(data.token)
setShowLogin(true)
}
else{
toast.error(data.message)
}
} catch (error) {
    toast.error(error.response.data.message)
     console.log(error)
   
}
}
  return (

        <div className="login-container">
          <div className="login-box">
            <h2>Login</h2>
            <form onSubmit={submitForm}> 
              <input type="email" placeholder="Example@gmail.com" className="input-field" onChange={takeInput} name='email' value={loginData.email} required/>
              <input type="password" placeholder="Password" className="input-field" onChange={takeInput} name='password' value={loginData.password} required/>
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      
    
  )
}

export default Login