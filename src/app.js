const express = require('express');

const connectDB = require("./configure/database");

const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req,res) => {

 const user = new User(req.body);
 
 try{
   await user.save();
   res.send("userdata saved sucessfully");
 }
 catch(err){
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

