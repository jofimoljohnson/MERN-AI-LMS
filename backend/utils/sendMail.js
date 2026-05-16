import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
dotenv.config()

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

const sendMail=async(to,otp)=>{
await transporter.sendMail({
    from: process.env.USER_EMAIL, // sender address
    to: to, // list of recipients
    subject: "Reset Your Password", // subject line
    text: `Your OTP for Password Reset is ${otp}. It expires in 5 minutes`, // plain text body
    html: `<p>Your OTP for Password Reset is <b>${otp}</b>. It expires in 5 minutes</p>`, // HTML body
  });
}
export default sendMail