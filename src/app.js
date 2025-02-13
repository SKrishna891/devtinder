const express = require('express');

const app = express();

app.use("/", (req, res) => {
    res.send("Namastey sai");
});


app.use("/hello", (req, res) => {
    res.send("helo hello");
});

app.use("/test", (req, res) => {
    res.send("Hello from the server");
});

app.listen(3000, () => {
    console.log("server is listen ing on port 3000");
});