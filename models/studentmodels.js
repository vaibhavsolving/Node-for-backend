
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Define the schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true     //means name is compulsory
    },
    roll_number :{
      type:Number
    },
    age: {
        type: Number,
        
    },
    favourite_subject: {
        type: String,
        enum: ['Maths', 'Physics', 'Chemistry'], //FAvourite tabhi accept hoga jb inn teno mai se kuch hoga
        required: true
    },
    mobile: {
        type: String,
    },
    email:{
        type: String,
        required: true,  // must chahiye
        unique: true,      //must new chahiye
    },
    address: {
        type: String
    },    
    username: {
        required: true,
        type: String
    },
    password: {
        requried: true,
        type: String
    }

});

personSchema.pre('save', async function(next){
    const person = this;

    //Hash the password only if it has been modified (or is new)
    if( !person.isModified('password')) return next();
    try{
        // hash password generation
        const salt = await bcrypt.genSalt(11);
        // Hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);
        // Override the plain password with the hashed one 
        person.password = hashedPassword;
        next();
    }catch(err){
        return next(err);
    }
});

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        //use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}


const person = mongoose.model('person', personSchema);
module.exports = person;

//module.exports = mongoose.model("AuthUsers", authSchema);       (ek line mai model define kiya)

