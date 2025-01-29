import mongoose from "mongoose";
//database connectivity
export const connectDatabase=async()=>{
try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("Database Connected Sucessfully.")
    
} catch (error) {
    console.log(error.message)
}
}