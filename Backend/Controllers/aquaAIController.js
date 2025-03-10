import { GoogleGenerativeAI } from "@google/generative-ai";

const generatePromt=async(req,res)=>{
const{question}=req.body;
if(!question){
    return res.status(400).json({success:false,message:"please type a question "})
}
try {
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const prompt = `
You are Aquacart AI, an expert on aquatic fish and marine life. 
Provide detailed and helpful answers on topics related to aquatic fish, including care, nutrition, habitat, and breeding,aquatic plants,all details about aquariums.
If the question is not related to aquatic fish, simply reply with: "I don't know. I am an aquatic AI. only responding aquatic questions"

Question: ${question}
`;
const result = await model.generateContent(prompt);      
return res.status(200).json({success:true,message:result.response.text()})
} catch (error) {
    console.log(error)
    return res.status(500).json({success:false,message:"Internal server error"})
}
}
export {generatePromt}