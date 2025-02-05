
import jwt from 'jsonwebtoken'

export const generatejwt=(id)=>{
const token=jwt.sign({id},process.env.JWT_SECRET)
return token;
}