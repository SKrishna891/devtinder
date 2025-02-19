
const express = require("express");

const authRouter = express.Router();

const {validatesignupdata} = require("../utilis/validation");

const bcrypt = require("bcrypt");

const User = require("../models/user");

authRouter.post("/signup", async (req,res) => {
    try{
 
       // validatre the data
    validatesignupdata(req);
 const { firstName, lastName, email,password } = req.body;
 //encrypt the password
 const passwordhash = await bcrypt.hash(password, 10);
 
 
 
 // create new instance
  const user = new User({firstName, lastName, email, password :passwordhash});
  
  
    await user.save();
    res.send("userdata saved sucessfully");
  }
  catch(err){
    res.status(500).send("Error :" +err.message);
  }
 
 });

 authRouter.post("/login", async (req,res) => {
 
    const {email, password} = req.body;
 try{
    const user = await User.findOne({email: email});
    if(!user){
       throw new Error("Invalid credintials");
    }
    const ispasswordvalid = await user.validatepasswword(password);
    
    
    if(ispasswordvalid){
 
       const token = await user.getjwt();
 
       
       res.cookie("token",token);
       res.send("login sucessfull");
 }
 else{
    throw new Error("password not correct");
 }
 }catch(err){
    res.status(500).send("Error :" +err.message);
 }
 });

 authRouter.post("/logout", async (req,res) => {
    res.cookie("token", null, { 
        expires: new Date(0)});
    res.send("logout sucessfull");
 });


module.exports = authRouter;