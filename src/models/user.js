const mongoose = require("mongoose");
const validator = require('validator');

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
        required : true,
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
        required : true,
        min : 18,
    },

    
},{
    timestamps: true
});

module.exports = mongoose.model("User",UserSchema );