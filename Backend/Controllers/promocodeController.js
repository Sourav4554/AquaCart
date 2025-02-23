import promocodeModel from "../Models/promocodeModel.js";
import { promocodeEmail } from "../Utilities/email.js";

//controller for add promocode 
const addPromocode=async(req,res)=>{
const{promocode,discountPercentage,expiryDate,usageLimit}=req.body;
if(!promocode || !discountPercentage || !expiryDate || !usageLimit){
return res.status(400).json({success:false,message:"All fields required"})
}
try {
    const promocodeExist=await promocodeModel.findOne({promocode});
    if(promocodeExist){
    return res.status(400).json({success:false,message:"Promocode already exist"})
    }
    const ExpiryDateFormated=new Date();
    ExpiryDateFormated.setDate(ExpiryDateFormated.getDate()+Number(expiryDate))
    const getExpiryDate=ExpiryDateFormated.toISOString();
    const promo=new promocodeModel({
    promocode,
    discountPercentage,
    expiryDate:getExpiryDate,
    usageLimit
    });
    await promo.save();
    return res.status(200).json({success:true,message:"Promocode will be Added"})
} catch (error) {
    console.log(error)
    return res.status(500).json({success:false,message:"Internal Server Error"})
}
}

//controller for list promocode
const promocodeList=async(req,res)=>{
try {
    const promocode=await promocodeModel .find({}).sort({_id:-1})
    if(!promocode){
    return res.status(400).json({success:false,message:"No promocode will exist"})
    }
    return res.status(200).json({success:true,message:promocode})
} catch (error) {
    return res.status(500).json({success:false,message:"Internal Server Error"})
}
}

//controller for delete promocodes 
const deletePromocode=async(req,res)=>{
const {promocodeId}=req.body;
try {
  const promocode=await promocodeModel.findById(promocodeId);
  if(!promocode){
    return res.status(400).json({success:false,message:"promocode didnt exist"})
}else{
await promocodeModel.findByIdAndDelete(promocodeId);
return res.status(200).json({success:true,message:"Promocode will be removed"})
}
} catch (error) {
    return res.status(500).json({success:false,message:"Internal Server Error"}) 
}
}
//controller for send randomly selected promocode through email
const sendPromocode=async(req,res)=>{
const{email}=req.body;
try {
    const promocodeDetails= await promocodeModel.aggregate([{$sample:{size:1}}])
    if(!promocodeDetails.length){
    return res.status(400).json({success:false,message:"No promocode found"})
    }
    promocodeEmail(email,promocodeDetails[0].promocode)
    return res.status(200).json({success:true, message: 'A promocode is send to your email',});
} catch (error) {  
    return res.status(500).json({success:false,message:"Internal Server Error"}) 
}
}

//controller for apply promocode 
const applyPromocode=async(req,res)=>{
const{promocode,userId}=req.body;
if(!promocode){
return res.status(400).json({success:false,message:"promocode not found"})
}
try {
    const promo=await promocodeModel.findOne({promocode});
    if(!promo){
        return res.status(400).json({success:false,message:"Invalid promocode"})
        }
    if (promo.usersUsed.includes(userId)) {
        return res.status(400).json({ success: false, message: 'Promo code already used ' });
        }
      
    if (new Date(promo.expiryDate) < new Date()) {
        return res.status(400).json({ success: false, message: "Promo code has expired" });
      }
    if (promo.usedLimit && promo.usersUsed.length >= promo.usedLimit) {
        return res.status(400).json({ success: false, message: "Expired promocode " });
    }
    await promocodeModel.updateOne({ promocode }, { $push: { usersUsed: userId } });
    return res.status(200).json({success:true,message:"Succesfully applied promocode",discountPercentage:promo.discountPercentage})
} catch (error) {
    console.log(error)
     return res.status(500).json({success:false,message:"Internal Server Error"}) 
}
}


export {addPromocode,promocodeList,deletePromocode,sendPromocode,applyPromocode,}