const mongoose = require('mongoose');
require('dotenv').config();


const mongoURL_LOCAL = process.env.MONGODB_URL_LOCAL;            //apne local system pe
// const mongoURL = process.env.MONGODB_URL;                     // official server


//      ****** MODERN way to connect mongobd to node
async function connectDB() {
  try {
    await mongoose.connect(mongoURL_LOCAL);   // fixed variable name mongoURL_LOCAL    OR     mongoURL
    console.log('Connected to MongoDB server');

    // handle process termination gracefully
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed due to app termination');
      process.exit(0);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);    // exit if DB connection fails
  }
}


module.exports = connectDB;
