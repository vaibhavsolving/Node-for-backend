

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