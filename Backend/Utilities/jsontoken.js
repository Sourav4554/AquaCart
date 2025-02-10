
import jwt from 'jsonwebtoken'

export const generatejwt=(id)=>{
const token=jwt.sign({id},process.env.JWT_SECRET)
return token;
}

export const generateAdminjwt=(id)=>{
    const token=jwt.sign({role:'admin'},process.env.JWT_SECRET)
    return token;
    }