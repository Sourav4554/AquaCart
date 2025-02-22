import promocodeModel from "../Models/promocodeModel.js";

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
export {addPromocode,promocodeList,deletePromocode}