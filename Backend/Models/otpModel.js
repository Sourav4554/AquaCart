import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
        },
    email:{
        type:String,
        required:true,
        unique:true
        },
    password:{
        type:String,
        required:true
        },
    verifyOtp:{
        type:String,
        default:''
        },
    verifyOtpExpireAt:{
        type:Number,
        default:0
        },
    createdAt:{
         type: Date,
         default: Date.now
        },
})

otpSchema.index({createdAt: 1 },{expireAfterSeconds: 600 });
const otpModel= mongoose.model('otp',otpSchema);

export default otpModel;