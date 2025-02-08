import fishModel from "../Models/fishModel.js";
import { cloudinary } from "../Configuration/cloudinaryConfig.js";

//controller for add fish to cloudinary and database
const addFish=async(req,res)=>{
const{name,category,description1,description2,description3,price,stock}=req.body;
const file=req.file;
 if(!name || !category|| !description1|| !description2|| !description3 || !price || !file || !stock){
 return res.status(400).json({succes:false,message:"all fields required"})
 }
try {
const fileBase64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
const result=await cloudinary.uploader.upload(fileBase64,{
    folder:'fishHub',
    public_id:`image-${Date.now()}`,
    resource_type:"image",
})
console.log(result.secure_url)
const addFish= new fishModel({
name,
category,
description1,
description2,
description3,
price,
image:result.secure_url,
stock
})
await addFish.save();
return res.status(200).json({succes:true,message:'fish added'})
} catch (error) {
    console.log(error)
    return res.status(500).json({succes:false,message:'Internal server error'})
}
}

export{addFish}