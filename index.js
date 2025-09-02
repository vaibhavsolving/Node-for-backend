// index.js                    //cd C:\Users\VAIBHAV-MAURYA\DevRepos\Node-for-backend = this is path name
                               // whenever get error use above line 

require("dotenv").config();                       // use for security,flexibility(mongodb://127.0.0.1:27017/devDB,mongodb+srv://cluster/...), maintainability
//console.log("Loaded PORT:", process.env.PORT);              //way of calling .env
// console.log("Loaded MONGO_URL:", process.env.MONGO_URL);


const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/userRoutes");

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());      // to handle JSON body

// DB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => {
    console.error(" Mongo Error:", err);
    process.exit(1);      // Exit if DB not connected
  });

// Routes
app.use("/", userRoutes);   // all user-related endpoints

// Start server
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
