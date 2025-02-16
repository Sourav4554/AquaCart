import userModel from "../Models/userModel.js";


//controller for add to wishlist
const addTowish=async(req,res)=>{
const{productId,userId}=req.body;
if(!productId || !userId){
return res.status(400).json({success:false,message:"All fields required"})
}
    try {
        const userdata= await userModel.findById(userId);
        const wishListData=userdata.wishList;
        if(wishListData[productId]){
        return res.status(400).json({success:false,message:"item Already in the wishlist"})
        }
        else{
        wishListData[productId]=1;
        }
        await userModel.findByIdAndUpdate(userId,{wishList:wishListData});
        return res.status(200).json({success:true,message:"item added in wishList"})
    } catch (error) {
       
        return res.status(500).json({success:false,message:"Internal ServerError"})
    }
}

//controller for remove from wishlist
const removeFromWish=async(req,res)=>{
 const{productId,userId}=req.body;
 if(!productId || !userId){
 return res.status(400).json({success:false,message:"All fields required"})
 }
try {
    const userData=await userModel.findById(userId);
    const wishListData=userData.wishList;
    if(!wishListData[productId]){
    return res.status(400).json({success:false,message:"doesn't exist in WishList"})
    }
    else{
    delete wishListData[productId]
    }
    await userModel.findByIdAndUpdate(userId,{wishList:wishListData})
    return res.status(200).json({success:true,message:"remove from wishList"})
} catch (error) {
    return res.status(500).json({success:false,message:"Internal ServerError"})
}
}

//Controller for fetch WishList
const fetchWishList=async(req,res)=>{
    const{userId}=req.body;
    if(!userId){
        return res.status(200).json({success:false,message:"userid will be required"})
    }
try {
    const userData=await userModel.findById(userId);
    const wishListData=userData.wishList;
    return res.status(200).json({success:true,message:wishListData})
} catch (error) {
    console.log(error)
    return res.status(500).json({success:false,message:"Internal ServerError"})
}
}

export{addTowish,removeFromWish,fetchWishList}