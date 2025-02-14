const express = require('express');

const app = express();


app.get("/user", (req, res) => {
    res.send("Namastey sai");
});

app.post("/user", (req, res) => {
    res.send("data posted sucessfully");
});

app.delete("/user", (req, res) => {
    res.send("Data deleted sucessfully");
});

app.use("/test", (req, res) => {
    res.send("Hello from the server");
});
 
app.listen(3000, () => {
    console.log("server is listen ing on port 3000");
});