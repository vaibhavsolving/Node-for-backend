
const express = require('express');
const router = express.Router();
const Person = require('../models/studentmodels');    //person naam ke model ko export kr liya 
const {jwtAuthMiddleware, generateToken} = require('../jwt');

//Post route to add a person
router.post('/signup', async  (req,res) => {
    try{
        const data = req.body   //Assuming the request body contains the person data,,  data ke aandher sara schema ka data aagya 

        //create a new person document using the MOngoose model
        const newPerson = new Person(data);

        //save the new person to the database
        const response = await newPerson.save();    //await means wait kiya untill all data got saved
        console.log('Data saved');
        
        const payload = {
            id: response.id,
            username: response.username
        }
        console.log(JSON.stringify(payload));
        
        const token = generateToken(payload);
        console.log("Token is :", token);

        res.status(200).json({response: response, token: token});
    }
    catch(err){
        console.error("Erro saving person:", err.message);
        res.status(500).json({errors: err.message});
    }
})


// Login Route
router.post('/login', async(req, res) => {
    try{
        //Extract username and password from request body
        const {username, password} = req.body;
        //find the user by username
        const user = await Person.findOne({username: username});
        //if user does not exist or password does not match returing error
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'invalid username or password'});
        }

        //generate token
        const payload = {
            id: user.id,
            username: user.username
        }
        const token  = generateToken(payload);

        //return token as respone
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'internal Server Error'});
    }
});



//GOING TO CREATE profile route,,, Fetches User Data  from database with Requires Authentication 
router.get('/profile', jwtAuthMiddleware, async (req,res) => {
    try{
        const userData = req.user;
        console.log("user Data: ", userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});
    }catch(err){
        console.error()
    }
})


//GET method to get the person data
router.get('/',jwtAuthMiddleware, async (req,res) => {
    try{
        const data = await Person.find();     //Person.find() persone collection mai jitna bhi data tha vo lake de diya....
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.error("error fetching persons:", err.message);
        res.status(500).json({error: 'internal server error'});

    }
})

//now parameter change hota jayega url bhi change hota jayega
router.get('/:workType', async (req,res) => {
    try{
        const workType = req.params.workType;             //Extract the work type from the url parameter
        const subject = req.params.workType;
        if(['Maths', 'Physics', 'Chemistry'].includes(subject)) {
            const response = await Person.find({ favourite_subject: subject });

            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid subject type'});
        }
    }catch(err){
        console.error('Error fetching person:', err.message);
        res.status(500).json({error: 'Internal server error'});
    }
})

//"put", i mean updating(ke liye put or patch dono use kr sakte h)
router.put('/:id', jwtAuthMiddleware, async (req, res) => {           // yaha id variable h mongodb ka uniqe id h ye is variable mai aayega
    try{
        const personId = req.params.id;   //Extract the id from the url parameter
        const updatedPersonData = req.body; //updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
            new: true,     //Return the updated document
            runValidators: true, //Run Mangoose VAlidation
        })

        if(! response){
            return res.status(404).json({error: 'Subject not found'});
        }
        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.error('error facting person', err.message);
        res.status(500).json({Erro: 'Interanl server error'});

    }
})        //postman pe http://localhost:7000/person get kiya fir unique id ko copy kr liya then put function ke sath parameter de diya http://localhost:7000/person/68c3edb85ed6ff0be6a63b29, body row json mai jao aur change kr do jo change krna chahte ho { "name": "...."}


//Deleting any record  using "delete" method
router.delete('/:id', jwtAuthMiddleware, async (req, res) => {
    try {
        const personId = req.params.id;   // consistent lowercase
        const response = await Person.findByIdAndDelete(personId);  // use same variable

        if (!response) {
            return res.status(404).json({ error: 'Students not found' });
        }

        console.log('Data Deleted');
        res.status(200).json({ message: 'Students Deleted Successfully' });
    } catch (err) {
        console.error("Error in deleting:", err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
