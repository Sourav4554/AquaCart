import React, { useContext, useState } from 'react';
import './Email.css';
import { InputOtp } from "primereact/inputotp";
import { ProductContext } from '../../Context/ProductContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Email = () => {
const { showOtpContainer, setShowOtpContainer,backendUrl } = useContext(ProductContext);
const navigate=useNavigate()
  const [showPasswordContainer, setShowPasswordContainer] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    resetOtp: '',
    password: ''
  });


  // Unified input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Special handler for OTP input 
  const handleOtpChange = (e) => {
    setFormData((prev) => ({ ...prev, resetOtp: e.value }));
  };

  // Handle email form submission
  const handleEmailSubmit = async(e) => {
    e.preventDefault();
    try {
      const{data}=await axios.post(`${backendUrl}/api/user/forgott-password`,formData)
      if(data.success){
      toast.success(data.message)
      setShowOtpContainer(true);
      }
      else{
      toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
    }
  };

// function for Handle OTP form submission
const handleOtpSubmit = async () => {
    try {
      const {data} = await axios.post(`${backendUrl}/api/user/verify-otp`, { email: formData.email, resetOtp: formData.resetOtp }); 
      if (data.success) {
        toast.success(data.message);
        setShowPasswordContainer(true); 
        setShowOtpContainer(false); 
      } else {
        toast.error(data.message); 
      }
    } catch (error) {
      toast.error( error.response.data.message);
      console.log(error);
    }
  
};


  //function for  Handle password form submission
  const handlePasswordSubmit = async(e) => {
   e.preventDefault();
 try {
  const {data}=await axios.post(`${backendUrl}/api/user/reset-password`, {password:formData.password,email:formData.email});
  if(data.success){
  toast.success(data.message)
  navigate('/login')
  }
  else{
  toast.error(data.message)
  }
 } catch (error) {
  toast.error(error.response.data.message)
  console.log(error)
 }
  };

  return (
    <div className="main-container-for-email">
      {showOtpContainer && !showPasswordContainer ? (
        <div className="otp-container-for-reset-password">
          <h3>Enter OTP</h3>
          <InputOtp
            length={6}
            autoFocus
            className="otp-input"
            name="resetOtp"
            value={formData.resetOtp}
            onChange={handleOtpChange} // Special handler for OTP
          />
          <button className="otp-submit-btn" onClick={handleOtpSubmit}>Submit OTP</button>
        </div>
      ) : showPasswordContainer ? (
        <form className="email-form" onSubmit={handlePasswordSubmit}>
          <label htmlFor="password" className="email-label">Enter your New Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="New Password"
            required
            className="email-input"
            value={formData.password}
            onChange={handleChange} // Unified handler
          />
          <button type="submit" className="email-submit-button">Submit</button>
        </form>
      ) : (
        <form className="email-form" onSubmit={handleEmailSubmit}>
          <label htmlFor="email" className="email-label">Enter your email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            required
            className="email-input"
            value={formData.email}
            onChange={handleChange} // Unified handler
          />
          <button type="submit" className="email-submit-button">Submit</button>
        </form>
      )}
    </div>
  );
};

export default Email;
