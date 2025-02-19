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


        };

        

const validatePasswordUpdate = (req) => {

    const { oldPassword, newPassword} = req.body;

if(!oldPassword || !newPassword){

    return false;
}
    if(newPassword.length <6){
        return false;
    }
    return true;

};



        
        module.exports = {validatesignupdata, validateProfileEditdata,validatePasswordUpdate};
    
