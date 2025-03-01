import orderModel from "../Models/orderModel.js";
import userModel from "../Models/userModel.js";

//controller for cash on delivery
const cashOnDelivery=async(req,res)=>{
const{userId,items,amount,address}=req.body;
if(!userId || !items || !amount || !address){
return res.status(400).json({success:false,message:"All fields required"})
}
try {
 const orders= new orderModel({
 userId,
 items,
 address,
 amount,
 paymentMethod:'COD',
 payment:false,
 })
 await orders.save();
 await userModel.findByIdAndUpdate(userId,{cartData:{}})
 return res.status(200).json({success:true,message:"Order Placed"})
} catch (error) {
   return res.status(500).json({ message: 'Server error, please try again later.' });
}
}


//controller for fetch user order
const fetchUserorder=async(req,res)=>{
const {userId}=req.body;
try {
   const orderData=await orderModel.find({userId:userId}).sort({_id:-1});
   if(!orderData){
   return res.status(400).json({success:false,message:"no orders"})
   }else{
   return res.status(200).json({success:true,message:orderData})
   }
} catch (error) {
   return res.status(500).json({ message: 'Server error, please try again later.' });
}
}
export{cashOnDelivery,fetchUserorder}