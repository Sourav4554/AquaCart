import { EMAIL_VERIFY_TEMPLATE, LOGIN_EMAIL_TEMPLATE, EMAIL_VERIFY_TEMPLATE_2 } from "../Templates/emailTemplates.js";
import { transporter } from "../Configuration/emailConfig.js";

// Reusable sendEmail helper
const sendEmail = async (mailOptions) => {
  return await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("SendMail Error:", err);
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
};

// Function for sending email verification OTP
export const otpEmail = async (email, otp) => {
  try {
    await transporter.verify();
    await sendEmail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Verify Your Account",
      html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp),
    });
    console.log("OTP email sent successfully!");
  } catch (error) {
    console.log("Error sending OTP email:", error);
  }
};

// Function for sending welcome email on registration
export const loginEmail = async (email, name) => {
  try {
    await sendEmail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to Aquacart",
      html: LOGIN_EMAIL_TEMPLATE.replace("{{name}}", name),
    });
  } catch (error) {
    console.log("Error sending login email:", error);
  }
};

// Function for sending password reset OTP
export const otpEmailPassword = async (email, otp) => {
  try {
    await sendEmail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Reset Your Password",
      html: EMAIL_VERIFY_TEMPLATE_2.replace("{{otp}}", otp),
    });
  } catch (error) {
    console.log("Error sending password reset OTP email:", error);
  }
};

// Function for sending promo code
export const promocodeEmail = async (email, promocode) => {
  try {
    await sendEmail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Promocode is here",
      html: `<p>Your promocode is:</p> <h3>${promocode}</h3>`,
    });
  } catch (error) {
    console.log("Error sending promocode email:", error);
  }
};

// Function for sending order confirmation
export const orderEmail = async (email, item, amount) => {
  try {
    await sendEmail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Order Confirmation",
      text: `Your order for ${item} has been placed successfully with AquaCart.\n\nTotal Amount: ₹${amount}\n\nThank you for choosing AquaCart!`,
    });
  } catch (error) {
    console.log("Error sending order confirmation email:", error);
  }
};

// Function for sending order status update
export const statusEmail = async (email, item, amount, status) => {
  try {
    await sendEmail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Order Status Update",
      text: `Your order for ${item} has been [${status}] from AquaCart.\n\nTotal Amount: ₹${amount}\n\nThank you for choosing AquaCart!`,
    });
  } catch (error) {
    console.log("Error sending order status email:", error);
  }
};
