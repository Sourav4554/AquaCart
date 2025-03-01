import { EMAIL_VERIFY_TEMPLATE ,LOGIN_EMAIL_TEMPLATE,EMAIL_VERIFY_TEMPLATE_2} from "../Templates/emailTemplates.js";
import { transporter } from "../Configuration/emailConfig.js";

//function for sending emailVerification otp
export const otpEmail=async(email,otp)=>{
    try {
            await transporter.sendMail({
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:"verify your account",
            html:EMAIL_VERIFY_TEMPLATE.replace("{{otp}}",otp)
            })
           

    } catch (error) {
        console.log("Error sending OTP email:", error);
    }
    }

//function for sending email at the time of user registration
    export const loginEmail=async(email,name)=>{
        try {
            await transporter.sendMail({
                from:process.env.SENDER_EMAIL,
                to:email,
                subject:"Welcome to Aquacart",
                html:LOGIN_EMAIL_TEMPLATE.replace("{{name}}",name)
                })
        } catch (error) {
            console.log("Error sending OTP email:", error);
        }
        }

//function for sending password reset otp
        export const otpEmailPassword=async(email,otp)=>{
            try {
                await transporter.sendMail({
                    from:process.env.SENDER_EMAIL,
                    to:email,
                    subject:"Reset your password",
                    html:EMAIL_VERIFY_TEMPLATE_2.replace("{{otp}}",otp)
                    })
            } catch (error) {
                console.log("Error sending OTP email:", error);
            }
            }
//function for sending promocode
export const promocodeEmail=async(email,promocode)=>{
    try {
        await transporter.sendMail({
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:"Promocode is here",
            html:`<p>your promocode is </p> <h3>${promocode}</h3>`
            })
    } catch (error) {
        console.log("Error sending promocode:", error);
    }
    }

//function for sending order 
export const orderEmail=async(email,item,amount)=>{
    try {
        await transporter.sendMail({
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:"Order Confirmation  ",
            text:`Your order for ${item} has been placed successfully with AquaCart.  
            
            TotalAmount:₹${amount}

            Thank you for choosing AquaCart! 
            `
            })
    } catch (error) {
        console.log("Error sending promocode:", error);
    }
    }

    //function for sending order 
export const statusEmail=async(email,item,amount,status)=>{
    try {
        await transporter.sendMail({
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:"Order Status Update",
            text:`Your order for ${item} has been [${status}] from AquaCart.  
            
            TotalAmount:₹${amount}
            
            Thank you for choosing AquaCart! 
            `
            })
    } catch (error) {
        console.log("Error sending promocode:", error);
    }
    }