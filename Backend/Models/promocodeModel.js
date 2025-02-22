import mongoose, { Schema } from 'mongoose'

const promocodeSchema=new Schema({
    promocode:{
        type:String,
        unique:true,
        required:true,
        },
    discountPercentage:{
        type:Number,
        required:true,
        },
    minOrder:{
        type:Number,
        default:2000,
        },
    expiryDate:{
        type:Date,
        required:true
        },
    usageLimit:{
        type:Number,
        default:1
        },
    usersUsed:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
    }]
},{timestamps:true});

const promocodeModel=mongoose.models.promocode||mongoose.model('promocode',promocodeSchema)

export default promocodeModel