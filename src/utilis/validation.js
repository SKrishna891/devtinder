const validator = require("validator");


const validatesignupdata = (req) => {
    const {firstName, lastName, email, password}  = req.body;

    if(!firstName || !lastName){
        throw new Error("Name is required");
    }
        else if(!validator.isEmail(email)){
            throw new Error("emailid is required");
        }
        else if(!validator.isStrongPassword(password)){
            throw new Error("password is required");
        }

        }
        
        module.exports = validatesignupdata;
    
