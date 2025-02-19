const express = require('express');

const connectDB = require("./configure/database");







const app = express();

const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieparser());

const authRouter = require("./routers/auth");

const profileRouter = require("./routers/profile");

const requestRouter = require("./routers/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/",requestRouter);



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

