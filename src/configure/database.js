const mongoose = require("mongoose");

const connectDB = async () => {
   
        await mongoose.connect("mongodb+srv://namastedev:Krish891@cluster0.tcfdu.mongodb.net/devtinder");
};
      
     module.exports = connectDB;
       
    
