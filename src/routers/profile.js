
const express = require("express");

const profileRouter = express.Router();


const Userauth = require("../Middlewares/auth");

const {validateProfileEditdata} = require("../utilis/validation");

profileRouter.get("/profile", Userauth, async (req,res) => {
    try{
 
       const user = req.user;
 
    res.send(user);}
    catch(err){
       res.status(500).send("Error :" +err.message);
    }
 
 });

 profileRouter.patch("/profile/Edit", Userauth, async (req,res) => {

    try{
        if(!validateProfileEditdata(req)){
            throw new Error("invalid edit data");
        }
        const loginuser = req.user;

        Object.keys(req.body).forEach((key) => (loginuser[key] = req.body[key]) );
        
        loginuser.save();

        res.send("profile updated sucessfully");

    }catch(err){
        res.status(500).send("Error :" +err.message);
    }



 });

 profileRouter.patch("/")
 module.exports = profileRouter;