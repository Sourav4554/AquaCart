import orderModel from "../Models/orderModel.js";
import userModel from "../Models/userModel.js";
import { orderEmail, statusEmail } from "../Utilities/email.js";

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
 const itemNames=items.map((item)=>item.name)
 await orders.save();
 orderEmail(address.email,itemNames,amount)
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

//controller for fetch admin order
const fetchAdminorder=async(req,res)=>{
try {
   const orderData=await orderModel.find({}).sort({_id:-1});
   if(!orderData){
      return res.status(400).json({success:false,message:"no orders"})
      }else{
      return res.status(200).json({success:true,message:orderData})
      }
} catch (error) {
   return res.status(500).json({ message: 'Server error, please try again later.' });
}
}

//controller for status update
const updateStatus=async(req,res)=>{
const{orderId,status}=req.body;
try {
   await orderModel.findByIdAndUpdate(orderId,{status:status})

   const order=await orderModel.findById(orderId);
   if(order.status==='Delivered'){
      await orderModel.findByIdAndUpdate(orderId,{paymentMethod:'Paid'})
   }
   const email=order.address.email;
   const items=order.items.map((item)=>item.name);
   const amount=order.amount;
   statusEmail(email,items,amount,status)
   return res.status(200).json({success:true,message:"status updated"})
} catch (error) {
   
}
}
export{cashOnDelivery,fetchUserorder,fetchAdminorder,updateStatus}