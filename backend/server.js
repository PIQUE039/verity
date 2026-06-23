// IMPORTING DEPENDENCIES
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const listingRoutes = require('./routes/listingRoutes')
const path = require('path');

//CONFIGURATION
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended:true})); //Helps parse form data.
app.use(cors());  //Restrict origin before production
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/uploads', express.static(path.join(__dirname,'uploads')));

//ROUTES
app.get('/',(req,res) => {
   res.send('API is running...');
});

//Connecting Database Logic
const connectDB = async() => {
   try{
      await mongoose.connect(process.env.MONGO_URI);
      console.log('Local MongoDB connected successfully');

      //starting the server if the connection is successfull
      app.listen(PORT, () => {
         console.log(`Server is running on port ${PORT}`)
      });
   }catch(error){
      console.error('MongoDB connection failed:',error.message);
      process.exit(1);
   }
};

connectDB();