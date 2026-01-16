// IMPORTING DEPENDENCIES
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const listingRoutes = require('./routes/listingRoutes')

//CONFIGURATION
dotenv.config();
const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);

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
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => [
         console.log(`Server is running on prot ${PORT}`)
      ]);
   }catch(error){
      console.error('MongoDB connection failed:',error.message);
      process.exit(1);
   }
};

connectDB();