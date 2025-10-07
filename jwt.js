
/*
//going to do, postman,mongo
const express = require("express")
const app = express()
const mongoose = require("mongoose");

app.use(express.json());

//correct connection of callback mongodb
// Callback with mongoose.connect
// In new versions of Mongoose (v7+), mongoose.connect() does not accept a callback anymore.
// Instead, it returns a Promise, so you should use .then().catch() or async/await.

mongoose.connect("mongodb://localhost:27017/mynewdb")
    .then(() => console.log(" conneted to MongoDB"))
    .catch((err) => console.error(" MongoDB connetion error:", err));

// Schema (better use mongoose.Schema)
const sch = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    id: Number,
});
const monmodel = mongoose.model("NEWCOL", sch);    //Attach this schema with mongodb 2nd,5th and 6th is variable


//post 
app.post("/post",async(req,res) => {            //http://localhost:3000/post   ISS POST FUNTION NE HI DECIDE KYA H URL mai post likhne ko
    console.log("inside post function");

    const data = new monmodel({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        id: req.body.id,
    });
    //storing this data in mongodb database collection
    try{
        const val = await data.save();
        res.json(val);
    } catch (err){
        res.status(500).json({error: err.message});
    }
    

});

//start server
app.listen(8000, () => {
    console.log("Server running on port 3000")
});



*/






const jwt = require('jsonwebtoken');


const jwtAuthMiddleware = (req, res, next) => {

    //first check requrst headers has authorization or not
    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({error: "token is not found"})
    // Extract the jwt token from the request header

    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error: 'unauthorized'});

    try{
        //verify the jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Attach user information to the request object
        req.user = decoded
        next();
    }catch(err){
        console.error(err);
        res.status(401).json({error: 'Invalid token'});
    }
}

//Function to generate JWT token
const generateToken = (userData) => {
    //generate a new jwt token using user data and secret key
    return jwt.sign({userData}, process.env.JWT_SECRET, {expiresIn: 300000});   //30000 means sec, and userData should by object like this {userData} inside this bracket
}

module.exports = {jwtAuthMiddleware, generateToken}