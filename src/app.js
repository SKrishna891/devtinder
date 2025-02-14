const express = require('express');

const app = express();


app.use("/user", (req, res,next) => {
    console.log("server1");
   // res.send("Hello from the server1");
    next();
},
(req, res,next) => {
    console.log("server2");
   // res.send("Hello from the server2");
    next();
},
[(req,res,next) => {
    console.log("server3");
    //res.send("Hello from server 3");
    next();
},
(req,res,next) => {
    console.log("server4");
    //res.send("Hello from server 4");
    next();
},
(req,res,next) => {
    console.log("server5");
    res.send("Hello from server 5");

}]
);
 
app.listen(3000, () => {
    console.log("server is listen ing on port 3000");
});