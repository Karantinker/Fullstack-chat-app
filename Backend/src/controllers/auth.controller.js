import { gennerateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js";

export const signup =async (req,res)=>{
    
    const {fullname,email,password} = req.body;

    try {

        if(!fullname || !email || !password){
            return res.status(400).json({message:"Please fill in all fields"})
        }


       if(password.length<6){
           return res.status(401).json({message:"Password must atleast 6 characters"});
       }
       const user = await User.findOne({email});
       if(user) return res.status(400).json({message:"Email already exists"});
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);
       const newUser = new User({
        fullname,
        email,
        password:hashedPassword,
       })
       
       await newUser.save(); // Save the new user first
       if(newUser){
        //generate jwt token here
        gennerateToken(newUser._id,res);
        res.status(201).json({
            _id:newUser._id,
            fullname:newUser.fullname,
            email:newUser.email,
            profilePic:newUser.profilePic,
        });

       }
       else{
        return res.status(400).json({message:"invalid user data"})
       }


    } catch (error) {
        console.log("Error in signUp controller",error.message);
        res.status(500).json({message:"Internal server error"})
    }
};

export const login = async (req,res)=>{
    
    const {email,password}=req.body

    try {

      const user= await User.findOne({email});
      if(!user) return res.status(400).json({message:"Invalid email or password"});
      const isValidPassword = await bcrypt.compare(password,user.password);
      if(!isValidPassword){
        return res.status(400).json({message:"Invalid email or password"});
      }
      //generate jwt token here
      gennerateToken(user._id,res);
      res.status(200).json({
        _id:user._id,
        fullname:user.fullname,
        email:user.email,
        profilePic:user.profilePic,
      })
        
    } catch (error) {
        console.log("Error in Login controller",error.message);
        res.status(500).json({message:"Internal server error"})
    }
};


export const logout = (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
       console.log("Error in logOut controller");
       res.status(500).json({message:"Internal server error"})
    }
};


export const updateProfile = async (req,res)=>{
     try {
        const {profilePic}=req.body;
        const userId=req.user._id;
        if(!profilePic){
            return res.status(400).json({message:"Please add a profile picture"})
        }

       const uploadResponse= await cloudinary.uploader.upload(profilePic)
       const updatedUser= await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})
       
       res.status(200).json(updatedUser)

     } catch (error) {
        console.log("Error in update profile:",error);
        res.status(500).json({message:"Internal server error"});
     }
}

export const checkAuth= (req,res)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller",error);
        res.status(500).json({meessage:"Internal server error"});
    }
}

