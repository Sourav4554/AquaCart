import { generateAdminjwt } from "../Utilities/jsontoken.js";
import userModel from "../Models/userModel.js";
//controller for admin login
const adminLogin=(req,res)=>{
const{email,password}=req.body;
if(email===process.env.ADMIN_MAIL && password===process.env.ADMIN_PASSWORD){
const token=generateAdminjwt();
return res.status(200).json({success:true,token})
}
else{
return res.status(400).json({success:false,message:"Invalid Credentials"})
}
}

//controller for fetching all users
const fetchAllUsers=async(req,res)=>{
    try {
     const userData=await userModel.find({})
     if(!userData){
    return res.status(400).json({success:false,message:"No user will be exists"})
    }
    else{
    return res.status(200).json({success:false,message:userData})
    }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error, please try again later....' });
    }
    }
export {adminLogin,fetchAllUsers}