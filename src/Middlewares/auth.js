 const  Adminauth  = (req, res, next) => {
    console.log("admin is auth is geeting checked");
    const token = "xyz";
    const isAuthorized = token === "xyz";

    if(!isAuthorized){
        res.status(401).send("Unauthorized request");  
    }
    else{
        next();
    }
};

const Userauth = (req, res, next) => {
    console.log("admin is auth is geeting checked");
    const token = "xyz";
    const isAuthorized = token === "xyz";

    if(!isAuthorized){
        res.status(401).send("Unauthorized request");  
    }
    else{
        next();
    }
};

module.exports = {Adminauth, Userauth};