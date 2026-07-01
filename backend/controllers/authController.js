const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//REGISTER LOGIC
exports.register = async (req,res) => {
   try{
      const{name,email,password} = req.body;

      //Checking if User already exists
      const userExists = await User.findOne({email});
      if(userExists){
         return res.status(400).json({message:'User already exists'})
      }

      //Hashing the passowrd
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      //Create new User
      const newUser = new User({
         name,
         email,
         password: hashedPassword
      });

      await newUser.save();
      res.status(201).json({message:'User registered successfully'});
      
   }catch(error){
      res.status(500).json({message:'Server Error',error: error.message});
   }
};

//LOGIN LOGIC
exports.login = async(req, res) => {
   try{
      const {email, password} = req.body;

      //Finding User by Emai
      const user = await User.findOne({email});
      if(!user){
         return res.status(400).json({message:'Invalid Credentails'});
      } 

      //Comparing password
      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch){
         return res.status(400).json({message:'Invalid Credentails'});
      }

      //Creating a JWT Token
      const token = jwt.sign(
         {id: user._id},
         process.env.JWT_SECRET,
         {expiresIn: '1d'} //Token expires in 1 day
      );

      //Sending the Token back to the User
      res.status(200).json({
         message:'Login Successfull.',
         token:token,
         user:{id: user._id, name: user.name, email: user.email}
      })
   }catch(error){
      res.status(500).json({message:'Server Error', error: error.message});
   }

};

exports.toggleSavedListing = async (req, res) => {
      try{
         const { id } = req.params;
         const user = await User.findById(req.user);

         //Checking if the lisitng is already saved in the DB 
         const alreadySaved = user.savedListings.some(
            savedId => savedId.toString() === id
         ); 

         //If it's already saved than deleting it from saved (toggle behaviour) else adding it to save
         if(alreadySaved){
            user.savedListings = user.savedListings.filter(
               savedId => savedId.toString() !== id
            );
         }else{
            user.savedListings.push(id);
         }

         //saving the change in mongoDB
         await user.save();
         res.status(200).json({savedListings: user.savedListings});

      }catch(error) {
         res.status(500).json({message: "Error updating saved listings"});
      }
};