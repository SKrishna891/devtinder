
const express = require("express");

const profileRouter = express.Router();

const bcrypt = require("bcrypt");


const Userauth = require("../Middlewares/auth");

const {validateProfileEditdata} = require("../utilis/validation");

const {validatePasswordUpdate} = require("../utilis/validation");

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

 profileRouter.patch("/profile/change-password", Userauth, async (req, res) => {
    try {
        if(!validatePasswordUpdate(req)){
            throw new Error("invalid data");
        }

        const user = req.user;//authenticate

        const {oldPassword, newPassword} = req.body;

//compare old password in the database to the user sent password

        const isoldpasswordcorrect = await bcrypt.compare(oldPassword, user.password);

        if(!isoldpasswordcorrect){
            throw new Error("oldpassword is wrong");
        }

       

        const hashpassword = await bcrypt.hash(newPassword,10);//hash the password
           console.log(hashpassword);
        user.password= hashpassword;//update the password

        await user.save();// save in database
        res.send("password updated sucessfully");

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

 module.exports = profileRouter;