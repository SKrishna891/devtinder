const express = require('express');

const app = express();

const { Adminauth, Userauth } = require("./Middlewares/auth");
console.log("Adminauth middleware:", Adminauth);

app.use("/admin",Adminauth);


app.get("/user", Userauth, (req,res) => {

    res.send("user data sent");    
});

app.get("/admin/getAllData",(req,res) => {

        res.send("Data sent sucessfully");    
});

app.get("/admin/Deleteuser", (req,res) => {
    res.send("Data delted sucessfully");
});
 
app.listen(3000, () => {
    console.log("server is listen ing on port 3000");
});