import userModel from "../Models/userModel.js";
import otpModel from "../Models/otpModel.js";
import { otpEmail,loginEmail,otpEmailPassword } from "../Utilities/email.js";
import bcrypt from 'bcrypt'
import { generateOtp } from "../Utilities/otp.js";
import { generatejwt } from "../Utilities/jsontoken.js";
import { oauth2Client } from "../Configuration/googleConfig.js";
import axios from 'axios'

//controller for user registration
const Register=async(req,res)=>{
const{name,email,password}=req.body;
if(!name || !email || !password){
return res.status(400).json({success:false,message:"All fields required"})
}

try {
    const userinOtpModel=await otpModel.findOne({email})
    if(userinOtpModel){
    return res.status(409).json({success:false,message:"user Registration pending. enter details after 10 minutes for signup"})
    }
    const existUser=await userModel.findOne({email});
    if(existUser){
    return res.status(409).json({success:false,message:"user already exists"})
    }

    const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if(!passwordRequirements.test(password)){
        return res.status(422).json({success:false,message:"password contain 1 uppercase 1 lowercase 1 digit and atleast 6 characters"})
    }
    const gensalt=await bcrypt.genSalt(10)
    const passwordHash=await bcrypt.hash(password,gensalt);
    const verifyOtp=generateOtp();
    const verifyOtpExpireAt=new Date(Date.now()+2*60*1000);
    const otpData=new otpModel({
    name,
    email,
    password:passwordHash,
    verifyOtp,
    verifyOtpExpireAt
    })
    await otpData.save();
    otpEmail(email,verifyOtp);
    return res.status(201).json({success:true,message:"An otp is send to your mail"})
   
} catch (error) {
    console.error(error);
   return res.status(500).json({ message: 'Server error, please try again later.' });
}
}


//Controller for emailverification through otp
const verifyEmail=async(req,res)=>{
    const{email,verifyOtp}=req.body;
    if(!verifyOtp){
    return res.status(400).json({success:false,message:"Please enter otp"})
    }
    try {
        const userExist=await otpModel.findOne({email});
        if (!userExist) {
            return res.status(400).json({ sucess:false,message: 'No pending registration found.'});
          }
        if(userExist.verifyOtp!==verifyOtp){
            return res.status(400).json({success:false,message: 'Invalid otp.'});
        }
        if(new Date()>userExist.verifyOtpExpireAt){
            userExist.verifyOtp='';
            userExist.verifyOtpExpireAt=0;
            await userExist.save();
            return res.status(400).json({success:false, message: 'otp has expired'});
        }
        const userData=new userModel({
        name:userExist.name,
        email:userExist.email,
        password:userExist.password,
        })
     const user=await userData.save();
       await otpModel.deleteOne({email});
       const token=generatejwt(user._id)
       loginEmail(email, userExist.name);
       return res.status(200).json({success:true,token})
    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({ message: 'Server error, please try again later.',error:error.message });
    }
    }

//Controller for user login
const Login=async(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
    return res.status(400).json({success:false,message:"All fields required"})
    }
    const userExist=await userModel.findOne({email});
    if(!userExist){
    return res.status(404).json({success:false,message:"user didn't exist"})
    }
    if (userExist.isGoogleUser) {
        return res.status(400).json({ message: "Please log in using Google" });
      }
    const checkPassword=await bcrypt.compare(password,userExist.password)
    if(!checkPassword){
    return res.status(401).json({success:false,message:"Invalid Credentials"})
    }
    const token=generatejwt(userExist._id)
    return res.status(200).json({success:true,token,message:"Login sucessfull"})
    }


   //Controller for sending  forgotten-password otp
   const forgottPassword=async(req,res)=>{
       const{email}=req.body;
       try {
           const user=await userModel.findOne({email});
           if(!user){
           return res.status(400).json({success:false,message:"user not found"})
           }
           const resetOtp=generateOtp();
           const resetOtpExpireAt=new Date(Date.now()+20*60*1000);
           user.resetOtp=resetOtp;
           user.resetOtpExpireAt=resetOtpExpireAt;
           await user.save();
           otpEmailPassword(email,resetOtp)
         return  res.status(200).json({success:true, message: 'An otp is send to your email' });
       } catch (error) {
           console.log(error)
        return res.status(500).json({ message: 'Server error, please try again later.' });
       }
            }
            
//controller for verify otp for reset password
    const verifyResetPasswordOtp=async(req,res)=>{
        const{email,resetOtp}=req.body;
        if(!email || !resetOtp){
            return res.status(400).json({success:false,message:"All fields required"})
            }
            try {
                const user=await userModel.findOne({email})           
            if(user.resetOtp!==resetOtp){
                return res.status(400).json({success:false,message: 'Invalid otp.'});
            }
            if(new Date()>user.resetOtpExpireAt){
                user.resetOtp='';
                user.resetOtpExpireAt=0;
                await user.save();
                return res.status(400).json({success:false, message: 'otp has expired restart the process again'});
            }
            return res.status(200).json({ success: true, message: 'OTP verified successfully!' });
        }catch (error) {
                console.log(error)
                res.status(500).json({ message: 'Server error, please try again later.' });
                }
                
        }
        
    
    
//Controller for reset password
const resetPassword=async(req,res)=>{
    const{password,email}=req.body;
    if(!password || !email){
    return res.status(400).json({success:false,message:"Enter new Password"})
    }
    try {
        const user=await userModel.findOne({email})
        if(!user){
       return res.status(400).json({success:false,message: 'user not found' });
        }
    
    const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if(!passwordRequirements.test(password)){
        return res.status(422).json({success:false,message:"password contain 1 uppercase 1 lowercase 1digit and atleast 6 characters"})
    }
    const gensalt=await bcrypt.genSalt(10)
    const passwordHash=await bcrypt.hash(password,gensalt);
    user.password=passwordHash;
    user.resetPassword='';
    user.resetOtpExpireAt=0;
    await user.save();
    return res.status(200).json({success:true,message:"Reset password Now you can Login"})
    } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Server error, please try again later.' });
    }
    }

//controller for fetch userdata
const getUserData=async(req,res)=>{
    const userId=req.body.userId;
    try {
        const user=await userModel.findById(userId)
        if(!user){
        return res.status(400).json({success:false,message:'no user Exist'})
        }
        else{
       return res.status(200).json({success:true,message:user})
        }
    } catch (error) {
        console.log(error.message)
        console.log("Error caught in catch block:", error);
   return res.status(500).json({success:false, message: 'Server error, please try again later.' });
    }
    }
    
//Controller for resend otp 
const resendOtp=async(req,res)=>{
    const {email}=req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
      }
    
    try {
        const user=await otpModel.findOne({email});
        if(!user){
        return res.status(400).json({success:false,message: 'user not found' });
        }
       const verifyOtp=generateOtp();
       const verifyOtpExpireAt=new Date(Date.now()+2*60*1000);
       user.verifyOtp=verifyOtp;
       user.verifyOtpExpireAt=verifyOtpExpireAt;
       await user.save();
       otpEmail(email,verifyOtp)
    return res.status(200).json({success:true, message: 'An otp is send to your email' });
    } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Server error, please try again later....' });
    }
    }

// controller for google authentication


const googleLogin=async(req,res)=>{
    const {code}=req.query;

    try {
    const googleResponse=await oauth2Client.getToken(code);
    oauth2Client.setCredentials(googleResponse.tokens);
    const userResponse=await axios.get( `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`)
    const {name,email}=userResponse.data;
    let user=await userModel.findOne({email});
    if(!user){
    user=new userModel({
    name,
    email,
    password:null,
    isGoogleUser: true,
    })
    await user.save();
    }
    
    const token=generatejwt(user._id)
    return res.status(200).json({success:true,token})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error, please try again later....' });
    }
    }

export{Register,verifyEmail,Login,verifyResetPasswordOtp,forgottPassword,resetPassword,getUserData,resendOtp,googleLogin}