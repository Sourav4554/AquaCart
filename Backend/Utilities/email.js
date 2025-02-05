import { EMAIL_VERIFY_TEMPLATE ,LOGIN_EMAIL_TEMPLATE} from "../Templates/emailTemplates.js";
import { transporter } from "../Configuration/emailConfig.js";
export const otpEmail=async(email,otp)=>{
    try {
        await transporter.sendMail({
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:"verify your account",
            html:EMAIL_VERIFY_TEMPLATE.replace("{{email}}",email).replace("{{otp}}",otp)
            })
    } catch (error) {
        console.log("Error sending OTP email:", error);
    }
    }

    export const loginEmail=async(email,name)=>{
        try {
            await transporter.sendMail({
                from:process.env.SENDER_EMAIL,
                to:email,
                subject:"Welcome to Aquacart",
                html:LOGIN_EMAIL_TEMPLATE.replace("[User's Name]",name)
                })
        } catch (error) {
            console.log("Error sending OTP email:", error);
        }
        }