
import fishModel from "../Models/fishModel.js";
import userModel from "../Models/userModel.js";
//controller for add review
const addReview=async(req,res)=>{
const{userId,productId,rating,comment}=req.body;
if(!productId || !rating || !comment){
return res.status(400).json({success:false,message:"all fields required"})
}
try {
    const fish=await fishModel.findById(productId);
    if(!fish){
    return res.status(400).json({success:false,message:"no fish found"})
    }
    if(fish.review.some(rev=>rev.user.toString()===userId)){
    return res.status(400).json({success:false,message:"Already reviewed this product"})
    }
    const newReview={
    user: userId,
    rating,
    comment,
    createdAt: new Date(),
    }
    fish.review.push(newReview);
    await fish.save();
    return res.status(200).json({success:true,message:"Review successfully added"})
} catch (error) {
    console.log(error)
    return res.status(500).json({success:false, message: 'Server error, please try again later....' });
}
}

//controller for list review
const listReview=async(req,res)=>{
const{productId}=req.body;
try {
    const fish=await fishModel.findById(productId);
    if(!fish){
    return res.status(400).json({success:false,message:"Fish not found"})
    }
    const reviews=await Promise.all(
        fish.review.map(async (rev)=>{
        const user=await userModel.findById(rev.user).select("name").sort({_id:-1});
        return {...rev._doc,user};
        })
        )
    return res.status(200).json({success:true,message:reviews})
} catch (error) {
    console.log(error)
    return res.status(500).json({success:false, message: 'Server error, please try again later....' });
}
}
export{addReview,listReview}