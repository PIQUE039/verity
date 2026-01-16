const Listing = require('../models/Listing');

exports.createListing = async (req, res) =>{
   try{
      const {title, description, price, category} = req.body;

      const newListing = new Listing({
         title,
         description,
         price,
         category,
         seller: req.user
      });

      await newListing.save();
      res.status(201).json(newListing);
   }catch(error){
      res.status(500).json({message:"Error creating listing"});
   }
};

exports.getListings = async (req, res) =>{
   try{
      //**.populate() joins the user data with lisitng data**
      const listings = await Listing.find().populate('seller','name');
      res.status(200).json(listings);
   }catch(error){
      res.status(500).json({message:"Error fetching listings"});
   }
};