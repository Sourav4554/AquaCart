import fishModel from "../Models/fishModel.js";
import { cloudinary } from "../Configuration/cloudinaryConfig.js";
import sharp from "sharp";
//controller for add fish to cloudinary and database
const addFish=async(req,res)=>{
const{name,category,description1,description2,description3,price,stock}=req.body;
const file=req.file;
 if(!name || !category|| !description1|| !description2|| !description3 || !price || !file || !stock){
 return res.status(400).json({succes:false,message:"all fields required"})
 }
try {
    let compressedBuffer;
    let outputFormat = "jpeg"; 

   
    switch (file.mimetype) {
        case "image/png":
            outputFormat = "png";
            compressedBuffer = await sharp(file.buffer).resize(800).png({ quality: 70 }).toBuffer();
            break;
        case "image/webp":
            outputFormat = "webp";
            compressedBuffer = await sharp(file.buffer).resize(800).webp({ quality: 70 }).toBuffer();
            break;
        case "image/avif":
            outputFormat = "avif";
            compressedBuffer = await sharp(file.buffer).resize(800).avif({ quality: 50 }).toBuffer();
            break;
        default:
            
            outputFormat = "jpeg";
            compressedBuffer = await sharp(file.buffer).resize(800).jpeg({ quality: 70 }).toBuffer();
            break;
    }

    // Convert compressed buffer to Base64 format
    const fileBase64 = `data:image/${outputFormat};base64,${compressedBuffer.toString("base64")}`;


const result=await cloudinary.uploader.upload(fileBase64,{
    folder:'fishHub',
    public_id:`image-${Date.now()}`,
    resource_type:"image",
})
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

//controller for list fish
const listFish=async(req,res)=>{
try {
    const fishList = await fishModel.find({}).sort({ _id: -1 });
    return res.status(200).json({succes:true,message:fishList})
} catch (error) {
    return res.status(500).json({succes:false,message:"Internal server error"})
}
}

//controller for delete fish
const deleteFish=async(req,res)=>{
const {productId}=req.body;
try {
   const product=await fishModel.findById(productId)
   if(!product){
    return res.status(400).json({succes:false,message:"product not found"})
    }else{
    const imageUrl=product.image;
    const publicId = imageUrl.replace(/^.*\/upload\/v\d+\//, "").replace(/\.[^.]+$/, "");
    await cloudinary.uploader.destroy(publicId)
    await fishModel.findByIdAndDelete(productId);
    return res.status(200).json({succes:true,message:"product removed"})
    }
} catch (error) {
    console.log(error)
    return res.status(500).json({succes:false,message:"Internal server error"})
   
}
}

//controller for update fish
const updateFish=async(req,res)=>{
const{productId,name,category,description1,description2,description3,price,stock}=req.body;
const file=req.file;
try {
    const fishExist=await fishModel.findById(productId);
    if(!fishExist){
    return res.status(400).json({succes:false,message:"product not found"})
    }
    let imageUrl=fishExist.image;
    if(file){
        const publicId = imageUrl.replace(/^.*\/upload\/v\d+\//, "").replace(/\.[^.]+$/, "");
        await cloudinary.uploader.destroy(publicId);
        const fileBase64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
        const result=await cloudinary.uploader.upload(fileBase64,{
        folder:'fishHub',
        public_id:`image-${Date.now()}`,
        resource_type:"image",
        })
        imageUrl=result.secure_url;
    }
   await fishModel.findByIdAndUpdate(productId,{ name, category, description1, description2, description3, price, stock, image: imageUrl });
   return res.status(200).json({ success: true, message: "Fish updated successfully", });
} catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: "Internal server error" });
}
}
export{addFish,listFish,deleteFish,updateFish}