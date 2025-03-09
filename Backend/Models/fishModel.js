import mongoose from "mongoose";

const fishSchema=new mongoose.Schema({
name:{
    type:String,
    required:true,
},
category:{
    type:String,
    required:true,
},
description1:{
    type:String,
    required:true,
},
description2:{
    type:String,
    required:true,
},
description3:{
    type:String,
    required:true,
},
price:{
    type:Number,
    required:true,
},
image:{
    type:String,
    required:true,
},
stock:{
    type:Boolean,
    default:true,
    required:true,
},
review:[{
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}]
},{minimize:false ,timestamps:true})

const fishModel=mongoose.models.fish || mongoose.model('fish',fishSchema);

export default fishModel;  