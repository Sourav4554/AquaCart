import crypto from 'crypto'

 const generateOtp=()=>crypto.randomInt(100000, 999999).toString();

 export {generateOtp};