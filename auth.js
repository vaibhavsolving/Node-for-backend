const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const person = require('./models/studentmodels'); 

// auth
passport.use(new LocalStrategy(async (USERNAME,password, done) => {
    //auth logic
    try{
        // console.log('Received credentials:', USERNAME, password);   //print username and password on terminal
        const user = await person.findOne({username: USERNAME});
        if(!user)
            return done(null, false, {message: 'Incorrect username.'});
        const isPasswordMatch = await user.comparePassword(password);    //comparepassword ek function banya jise define personModels.js mai kiya h
        if(isPasswordMatch){
            return done(null, user);
        }else{
            return done(null, false, {message: 'Incorrect password.' });
        }
    }catch(err){
        return done(err);
    }
}));

module.exports = passport; 
