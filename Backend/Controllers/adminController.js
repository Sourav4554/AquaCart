import { generateAdminjwt } from "../Utilities/jsontoken.js";

const adminLogin=(req,res)=>{
const{email,password}=req.body;
if(email===process.env.ADMIN_MAIL && password===process.env.ADMIN_PASSWORD){
const token=generateAdminjwt();
return res.status(200).json({success:true,token})
}
else{
return res.status(400).json({success:false,message:"Invalid Credentials"})
}
}
export {adminLogin}