import userModel from "../Models/userModel.js";
import otpModel from "../Models/otpModel.js";
import { otpEmail,loginEmail } from "../Utilities/email.js";
import bcrypt from 'bcrypt'
import { generateOtp } from "../Utilities/otp.js";
import { generatejwt } from "../Utilities/jsontoken.js";


//controller for user registration
const Register=async(req,res)=>{
const{name,email,password}=req.body;
if(!name || !email || !password){
return res.status(400).json({success:false,message:"All fields required"})
}

try {
    const userinOtpModel=await otpModel.findOne({email})
    if(userinOtpModel){
    return res.status(409).json({success:false,message:"user Registration pending. enter details after 5 minutes for signup"})
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


//emailverification through otp
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
    
export{Register,verifyEmail}