
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
app.listen(3000, () => {
    console.log("Server running on port 3000")
});