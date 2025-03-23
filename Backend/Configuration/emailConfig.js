import nodemailer from "nodemailer";

export const transporter=nodemailer.createTransport({
host: "smtp-relay.sendinblue.com",
port:587,
secure:false,
auth:{
user:process.env.SMTP_USER,
pass:process.env.SMTP_PASSWORD
},
tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 5000,
});

