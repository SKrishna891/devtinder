
const express = require("express");

const requestRouter = express.Router();

const Userauth = require("../Middlewares/auth");

requestRouter.post("/sendingrequest", Userauth,async (req, res) => {

    const user = req.user;
 
    res.send(user.firstName + "request sent");
 
 });

module.exports = requestRouter;