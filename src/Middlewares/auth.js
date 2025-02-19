 const jwt = require("jsonwebtoken");

 const User = require("../models/user");

const Userauth = async (req, res, next) => {

    try {
    const { token } = req.cookies;
    if(!token){
        throw new Error("inavalid token");
    }
    const decodeData = await jwt.verify(token, "dev@tinder$9");
    const { _id } = decodeData;

    const user = await User.findById(_id);
    if(!user){
        throw new Error("user  doesn't exit");
        
    }
    req.user = user; 
;
    next();
}  catch(err){
        res.status(404).send("user not found");
    }
    
};

module.exports = Userauth ;