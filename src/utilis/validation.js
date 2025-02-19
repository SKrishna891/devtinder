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

        };

        const validateProfileEditdata = (req) => {

     const allowedFields = ["firstName","lastName","gender","skills",]

     const isprofileallowed = Object.keys(req.body).every((field) => allowedFields.includes(field));

    return isprofileallowed;


        }
        
        module.exports = {validatesignupdata, validateProfileEditdata};
    
