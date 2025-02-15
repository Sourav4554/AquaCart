import userModel from "../Models/userModel.js";

//controller for add cart
const addToCart=async(req,res)=>{
const{productId,userId}=req.body;
if(!productId || !userId){
return res.status(200).json({success:false,message:"All fields required"})
}
try {
const userData=await userModel.findById(userId);
const cartData=userData.cartData;
if(!cartData[productId]){
cartData[productId]=1;
}
else{
cartData[productId]+=1;
}
await userModel.findByIdAndUpdate(userId,{cartData})
return res.status(200).json({success:true,message:'Added to cart'})
} catch (error) {
return res.status(500).json({success:false,message:'Internal server error'})
}
}

//controller for remove from cart
const removeFromCart=async(req,res)=>{
const{productId,userId}=req.body;
if(!productId || !userId){
return res.status(200).json({success:false,message:"All fields required"})
}
try {
const userData=await userModel.findById(userId);
const cartData=userData.cartData;
if(!cartData[productId]){
return res.status(400).json({success:false,message:"No items in cart"})
}
else{
cartData[productId]-=1;
}
if(cartData[productId]<=0){
delete cartData[productId];
}
await userModel.findByIdAndUpdate(userId,{cartData})
return res.status(200).json({success:true,message:'remove from cart'})
} catch (error) {
    return res.status(500).json({success:false,message:'Internal server error'})   
}
}

//controller for delete the cartitem
const deleteCart=async(req,res)=>{
    const{productId,userId}=req.body;
    if(!productId || !userId){
    return res.status(200).json({success:false,message:"All fields required"})
    }
try {
    const userData=await userModel.findById(userId);
    const cartData=userData.cartData;
    if(cartData[productId]){
    delete cartData[productId]
    }
await userModel.findByIdAndUpdate(userId,{cartData})
return res.status(200).json({success:true,message:'delete from cart'})
} catch (error) {
return res.status(500).json({success:false,message:'Internal server error'})   
}
}

//controller for fetch CartData
const fetchCartData=async(req,res)=>{
const{userId}=req.body;
if(!userId){
    return res.status(200).json({success:false,message:"userid will be required"})
}
try {
    const userData=await userModel.findById(userId);
    const cartData=userData.cartData;
    return res.status(200).json({success:true,message:cartData}) 
} catch (error) {
 return res.status(500).json({success:false,message:'Internal server error'}) 
}
}
export{addToCart,removeFromCart,deleteCart,fetchCartData}