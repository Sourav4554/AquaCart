import orderModel from "../Models/orderModel.js";
import userModel from "../Models/userModel.js";
import { orderEmail, statusEmail } from "../Utilities/email.js";
import Stripe from 'stripe';
import Razorpay from 'razorpay'


//stripe initialization
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

//razorpay initialization
const razorpayInstance=new Razorpay({
key_id:process.env.RAZORPAY_KEY_ID,
key_secret:process.env.RAZORPAY_KEY_SECRET
})

//global varibles
let deliveryCharge=50;
let currency='inr'
//global variables for  email senting after order in stripe and razorpay
let stripeEmail;
let stripeAmount;
let stripeItems;

//controller for stripepayment 
const stripePayment=async(req,res)=>{
const{userId,items,amount,address}=req.body;
const{origin}=req.headers;
if(!userId || !items || !amount || !address){
return res.status(400).json({success:false,message:"All fields required"})
}
try {
   const orders= new orderModel({
      userId,
      items,
      address,
      amount,
      paymentMethod:'Stripe',
      payment:false,
      })
   stripeEmail=address.email;
   stripeItems=items.map((item)=>item.name);
   stripeAmount=amount;
   await orders.save();
   const line_items=items.map((item)=>({
   price_data:{
   currency:currency,
   product_data:{
   name:item.name
   },
   unit_amount:item.price*100
   },
   quantity:item.quantity
   }));

   line_items.push({
   price_data:{
   currency:currency,
   product_data:{
   name:"Delivery Charges"
   },
   unit_amount:deliveryCharge*100
   },
   quantity:1
   })

const session=await stripe.checkout.sessions.create({
line_items:line_items,
payment_method_types:['card'],
payment_method_options:{
card:{request_three_d_secure:'any'}
},
mode:'payment',
success_url:`${origin}/verify?success=true&orderId=${orders._id}`,
cancel_url:`${origin}/verify?success=false&orderId=${orders._id}`
})
return res.status(200).json({success:true,message:session.url})
} catch (error) {
   return res.status(500).json({ success: false, message: 'internal server error' });
}
}

//verify the order using stripe 
const verifyOrder=async(req,res)=>{
const{orderId,success,userId}=req.body;
try {
   if(success==='true'){
   await orderModel.findByIdAndUpdate(orderId,{payment:true})
   await userModel.findByIdAndUpdate(userId,{cartData:{}});
   orderEmail(stripeEmail,stripeItems,stripeAmount)
   return res.status(200).json({success:true,message:"payment successfull"})
   }
   else{
   await orderModel.findByIdAndDelete(orderId)
   return res.status(400).json({success:false,message:"payment failed"})
   }
} catch (error) {
   console.log(error)
   return res.status(500).json({success:false,message:"Internal server error"})
}
}



//controller for razorpay payment
const razorpayPayment=async(req,res)=>{
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
         paymentMethod:'Razorpay',
         payment:false,
         })
         stripeEmail=address.email;
         stripeItems=items.map((item)=>item.name);
         stripeAmount=amount;
      await orders.save();
      const options={
      amount:amount*100,
      currency:currency.toUpperCase(),
      receipt:orders._id.toString()
      }
   const order=await new Promise((resolve,reject)=>{
     razorpayInstance.orders.create(options,(error,order)=>{
      if(error){
          reject(error)
       }else{
          resolve(order)
       }
    })
    })
    return res.status(200).json({ success: true, message: order });
   } catch (error) {
      console.log(error)
      return res.status(500).json({success:false,message:"Internal server error"})
   }
   }

// controller for verify razorpay paymet 
const verifyRazorpay=async(req,res)=>{
const {userId,razorpay_order_id}=req.body;
try {
   const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id)
   if(orderInfo.status==='paid'){
      await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
      await userModel.findByIdAndUpdate(userId,{cartData:{}})
      orderEmail(stripeEmail,stripeItems,stripeAmount)
      return res.status(200).json({success:true,message:"payment successfull"})
   }else{
      await orderModel.findByIdAndDelete(orderInfo.receipt)
      return res.status(400).json({success:false,message:"payment failed"})
   }
} catch (error) {
   return res.status(500).json({success:false,message:"Internal server error"})
}
}

//order cancellation in razorpay
const cancelOrder=async(req,res)=>{
const{orderId}=req.body;
if(!orderId){
return res.status(400).json({success:false,message:"Order id needed"})
}
try {
   await orderModel.findByIdAndDelete(orderId)
   return res.status(200).json({success:true})
} catch (error) {
   console.log(error)
}
}

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
      await orderModel.findByIdAndUpdate(orderId,{payment:true})
   }
   const email=order.address.email;
   const items=order.items.map((item)=>item.name);
   const amount=order.amount;
   statusEmail(email,items,amount,status)
   return res.status(200).json({success:true,message:"status updated"})
} catch (error) {
   return res.status(500).json({ message: 'Server error, please try again later.' });
}
}
export{cashOnDelivery,fetchUserorder,fetchAdminorder,updateStatus,stripePayment,verifyOrder,razorpayPayment,verifyRazorpay,cancelOrder}