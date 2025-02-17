const express = require('express');

const connectDB = require("./configure/database");

const User = require("./models/user");
const validatesignupdata = require("./utilis/validation");

const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());

app.get("/user", async (req,res) => {
   const userEmail = req.body.email;
   try{
      const user = await User.findOne({email : userEmail}); 
   if(!user){
      res.status(500).send("user data not saved");
   }
   else{
      res.send(user); 
   }
   }
   catch(err){
      res.status(401).send("usernotfound");
   }

});

app.get("/feed", async (req,res) => {
   try{
   const user = await User.find({});
   res.send(user);
   }catch(err){
      res.status(401).send("usernotfound");
   }
});

app.get("/byid", async (req,res) => {
const userId = req.body.userId;
   try {
const user = await User.findById(userId);
res.send(user);
   }catch(err){
      res.status(401).send("usernotfound");
   }
});
app.post("/signup", async (req,res) => {
   try{

      // validatre the data
   validatesignupdata(req);
const { firstName, lastName, email,password } = req.body;
//encrypt the password
const passwordhash = await bcrypt.hash(password, 10);

console.log(passwordhash);

// create new instance
 const user = new User({firstName, lastName, email, password :passwordhash});
 
 
   await user.save();
   res.send("userdata saved sucessfully");
 }
 catch(err){
   res.status(500).send("Error :" +err.message);
 }

});

app.delete("/user",async (req, res) => {

   const  userId = req.body.userId;
   try{
      const user = await User.findByIdAndDelete(userId);
      res.send("user deleted sucessfully");

   }catch(err){
   res.status(500).send("user data not saved");
 }

});

app.patch("/user/:67b141751bd44adb0f516db0", async (req,res) => {
const userId = req.params?.userId;
const data = req.body;
const Allowed_Updates = [
   "userId",
   "phonenumber",
   "firstName",
   "age",
   "email",

];

try{
const user = await User.findByIdAndUpdate(userId,data,{runValidators: true});
const isUpdatesAloowed = Object.keys(data).every((K) => Allowed_Updates.includes(K));
if(!isUpdatesAloowed){
   throw new error("update not alllowed");
}
res.send("userupdated sucessfully");
}catch(err){
   res.status(404).send("update failed: " + err.message);

 }
});
app.patch("/useremail", async(req,res) => {
const emailId = req.body.email;
const data = req.body;
try{
const user = await User.findOneAndUpdate({ email: emailId },data,
   );
res.send("data updated sucessfully");
}catch(err){
   res.status(500).send("user data not saved");
 }
});

connectDB()
     .then(() => {
        console.log("MongoDB connection established successfully");
        app.listen(3000, () => {
            console.log("server is listen ing on port 3000");
        });
     })
     .catch((err) => {
        console.error("MongoDB connection error:", error.message);
     });  

