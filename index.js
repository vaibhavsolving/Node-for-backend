// index.js                    //cd C:\Users\VAIBHAV-MAURYA\DevRepos\Node-for-backend = this is path name
                               

const express = require('express');
const mongoose = require('mongoose');
const personRoutes = require('./Routes/studentRoutes');
const app = express();


//mongoDB  connection
require('dotenv').config();
const connectDB = require('./db');
connectDB();   //call function

const PORT = process.env.PORT || 8000

//Models
app.use(express.json()); // middleware to read JSON body
app.use(express.urlencoded({extended: true}));


const passport = require('./auth');
app.use(passport.initialize());                                                                    //auth line 2
const LocalAuthMiddleware = passport.authenticate('local', {session: false});    //auth line 3

//get method,,,  //this is get rout jise aaise call karenge http://localhost:7000/
app.get('/', LocalAuthMiddleware , function(req,res){      
    res.send('Welcome back to my school')
});


//imprt the router file for person
const studentRoutes = require('./Routes/studentRoutes');
app.use('/person',  studentRoutes);         //yaha person likh dene se waha se remove kr diya personRout se



app.post('/login', LocalAuthMiddleware, (req, res) => {
    res.json({ message: "Login successful", user: req.user });
});


app.get('/chicken', (req,res) => {
    var customized_chicken = {
        name: " buttor chicken",
        size: ' 5kg extra large',
        is_buttor_more: true,
        is_buttor_old: false
    }
    res.send(customized_chicken);
    res.send('sure sir, i would love to serve chicken');
});

app.post('/stuff', (req, res) => {
    console.log('jai shree ram');                    //terminal pe
    res.send('data going to server...');             //postman pe
})



// app.listen(PORT); //from this line of code our server will get localhost...,   this is commented b/c below is written
app.listen(PORT, () => {
    console.log('Express is connected');
});          //localhost ke sath sath surety bhi mila ki server run ho rha h...
