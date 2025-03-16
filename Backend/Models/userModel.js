import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true 
    },
  email: { 
    type: String, 
    required: true,
    unique: true 
    },
  password: {
     type: String,
  
    },
  resetOtp:{
    type:String,
    default:''
    },
  resetOtpExpireAt:{
    type:Number,
    default:0
    },
  isGoogleUser: { 
    type: Boolean,
     default: false 
    },
  cartData:{
     type: Object,
     default:{} 
    },
  wishList:{ 
    type: Object,
    default:{}
 },
},{minimize:false ,timestamps:true});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);
export default userModel;