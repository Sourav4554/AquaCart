import orderModel from "../Models/orderModel.js";
import userModel from "../Models/userModel.js";


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
   res.status(500).json({ message: 'Server error, please try again later.' });
}
}

export{cashOnDelivery}