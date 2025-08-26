// index.js                    //cd C:\Users\VAIBHAV-MAURYA\DevRepos\Node-for-backend = this is path name
                               // whenever get error use above line 
const http = require("http");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
    return res.send("Hello Aditya sir From Home Page");
    // return res.send(`hello ${req.query.name}`);
});

app.get("/about", (req, res) => {
    return res.send("Hell09 Aditya sir From About Page");
});

const myServer = http.createServer(app);

myServer.listen(8000, () => {
    console.log("Server Started...");
});