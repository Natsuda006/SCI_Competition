import db from "../models/index.js";
import config from "../config/auth.config.js"
import jwt from "jsonwebtoken";
import crypto from "crypto";
import path from "path";
import { sendVerificationEmail } from "../utils/email.js";
import VerificationToken from "../models/verificationToken.model.js";
const User = db.User;
// const Admin = db.Admin;
// const Teacher = db.Teacher;
// const Judge = db.Judge;
// const VerificationToken = db.VerificationToken;

// Register
const signUp = async (req, res) => {
  const { name, email, password, type, school, phone } = req.body;

  try{
    // Validate request
    if(!name || !email || !password || !type){
      return res.status(400).send({
        message: "Name, Email, Password and Type are required !",
      });
    }

    // Validate user type
    const allowedType = ['admin', 'teacher', 'judge'];
    if(!allowedType.includes(type)){
      return res.status(400).send({
        message: "Invalid user type. Must be admin, teacher or judge",
      });
    }

    // Addition validatetion
    if(type === "teacher" && (!school || !phone)){
      return res.status(400).send({message: "school and phone are required for teacher!"});
    }

    // check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if(existingUser){
      return res.status(400).send({
        message: "Email already in use!"
      });
    }

    // Create user object base on type
    const userData = {
      name,
      email,
      password,
      type,
      isVerified:  false  // teacher ต้อง verify email ก่อน
    }

    if(type === "teacher") {
      userData.school = school;
      userData.phone = phone;
    }

    // Create new user
    const user = await User.create(userData);

    // If user is a teacher, create and send verification email
    if(type === "teacher"){
      try{
        // Create verification
        // hex = เลขฐาน 16
        const token = crypto.randomBytes(32).toString('hex');
        const verification = await db.VerificationToken.create({
          token: token,
          userId: user.id,
          expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
        });
        console.log("Verification token created:", verification);

        //TODO: send verification email
        await sendVerificationEmail(user.email,token,user.name);
        console.log("Verification email sent successfully");
      }catch(error){
        console.error("Error sending verification email:", error);
       }
    }

    res.status(201).send({
      message: user.type === "teacher" ? 'Registration successfully! Please check your email to verify your account' 
      : "User registered successfully!",
      user:{
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        // if แบบทางเลือกเดียว
        ...(user.type === "teacher" && { isVerified: user.isVerified })
      }
    })
  } catch(err) {
    return res.status(500).send({message: err.message});
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.params;
  if(!token){
    res.status(400).send({message: "Token is missing!"});
  }

  try{
    const verificationToken = await db.VerificationToken.findOne({ 
      where: { token},
     })
    if(!verificationToken){
      return res.status(404).send({message: "Invalid verification token!"});
    }
    // Check if token is expired
    if(new Date() > VerificationToken.expiredAt){
      await verificationToken.destroy();
      return res.status(400).send({message: "Verification token has expired"});
    }
    const user = await db.User.findByPk(verificationToken.userId);
    if(!user){
      return res.status(404).send({message: "User not found!"});
    }
    await user.update({isVerified: true});
    await verificationToken.destroy();

    //return web view
    const htmlPath = path.join(process.cwd(), 'views', 'verification-success.html'
  );
  res.sendFile(htmlPath);
  } catch (error) {
    return res.status(500).send({message: err.message || "Some error occurred while verifying the user" ,
    });
  }
};

const authControllers = {
  signUp,
  verifyEmail,
};

export default authControllers;