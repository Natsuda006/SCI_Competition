import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { getVerificationEmailTemplate } from "./emailTemplate.js"

dotenv.config();
// create Gmail transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.STMP_USER,
        pass:process.env.STMP_PASSWORD,
    }
});

//Verify SMTP connection
transporter.verify((error, success) => {
    if (error) {
        console.error("SMTP Connection Error:", error);
    } else {
        console.log('SMTP Server is ready to send email');
    }
});

// send verification email
export const sendVerificationEmail = async (email,token,userName) => {
    const verificationUrl  = `${process.env.BASE_URL}/api/v1/auth/verify/${token}`;

    const mailOptions = {
        from:{
             name:"ระบบการแข่งขันวันวิทยาศาสตร์",
             email:process.env.EMAIL_FROM,
        },
        to: email,
        subject: 'กรุณายืนยันอีเมลของคุณ - ระบบการแข่งขันวันวิทยาศาสตร์',
        html: getVerificationEmailTemplate(verificationUrl,userName),
        text: `ยินดีต้อนรับสู่ระบบการแข่งขันวันวิทยาศาสตร์! \n\n เรียนคุณ ${userName},\n\n ขอบคุณที่ลงทะเบียนเข้าร่วมระบบการแข่งขันทางวิทยาศาสตร์ กรุณายืนยันอีเมลของคุณโดยคลิกลิงก์ด้านล่าง: \n\n ${verificationUrl}\n\nลิงก์ยืนยันนี้จะหมดอายุใน 24 ชั่วโมง \n\n หากคุณไม่ได้ลงทะเบียนในระบบนี้ กรุณาละเว้นคลิกลิงก์นี้ \n\n นี้เป็นข้อความอัตโนมัติ กรุณาอย่าตอบกลับอีเมลนี้`,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Verification email sent successfully:');
        return info;
    } catch (error) {
        console.error('Error sending  email:', error);
    }
};