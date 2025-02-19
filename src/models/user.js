const mongoose = require("mongoose");
const validator = require('validator');

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,  
    },
    password : {
        type : String,
        required : true,
    },
        email : {
            type : String,
            required : true,
            unique : true,
            validator(value){
                if(!validator.isEmail(value)){
                    throw new error("invalid email");
                }
            }

        },
    phonenumber : {
            type : Number
    },
    gender :{
        type : String,
        validate(value){
            if(!["male", "female","others"].includes(value)){
                throw new error("gender is not valid");  
            }
        }
    },
    skills :{
        type : [String],
        default: ["javascript", "node"]
    },
    age : {
        type : Number,
        min : 18,
    },

    
},{
    timestamps: true
});

UserSchema.methods.getjwt = async function(){

    const user = this;

     const token = await jwt.sign({_id:user._id},"dev@tinder$9");

     return token;
};


UserSchema.methods.validatepasswword = async function(passwordbyinputuser){
    const user = this;
    const passwordhash = user.password;
    const ispasswordvalid = await bcrypt.compare(passwordbyinputuser, passwordhash);

    return ispasswordvalid;
};

module.exports = mongoose.model("User",UserSchema );