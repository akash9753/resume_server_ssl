import User from "../model/Signup.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const SignupController = async (req, res) => {
  const {firstName, lastName, email, password} = req.body;
  try{
      const oldUser = await User.findOne({email});
      if(oldUser){
          return res.status(400).json({success:false, message:"user already exists Please Signin"})
      }
      const hashPassword = await bcrypt.hash(password, 12);
       
      const result = await User.create({
          firstName,
          lastName,
          email,
          password:hashPassword,
          name:`${firstName} ${lastName}`
      })
      const token = jwt.sign({email:result.email, id: result._id},"akash1234",{expiresIn:"1h"})
      res.status(201).json({success:true,message:"Signup Successfully Please Signin"});
  }catch(error){
      res.status(500).json({success:false,message:"Something went wrong",Error:error})
      console.log(error);
  }
};

export const signinController = async (req,res) =>{
  const {email, password} = req.body
  try{
      const oldUser = await User.findOne({email});
      if(!oldUser){
          return res.status(404).json({success:false,message:"User dosen't exist"})
      }
      const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)

      if(!isPasswordCorrect)
      return res.status(400).json({success:false,message:"Invalid credential"})

      const token = jwt.sign({email:oldUser.email, id: oldUser._id},"akash1234",{
          expiresIn:"10h"
      })

      res.status(200).json({success:true,result:oldUser,token})
  }catch(error){
      res.status(500).json({success:false,message:"Something went wrong",Error:error})
      console.log(error);
  }
} 
