const Listing = require('../models/Listing');

exports.createListing = async (req, res) =>{
   
   try{
      //Safety check: if multer failed, req.body might be empty
      if(!req.body || Object.keys(req.body).length === 0){
         return res.status(400).json({message: "Form data is missing. Make sure Multer is configured in routes."});
      }
      const {title, description, price, category} = req.body;

      if(!req.file){
         console.log('No file received in req.file');
      }

      //Multer puts the file into 'req.file'
      const imagePath = req.file? req.file.path:'';

      const newListing = new Listing({
         title,
         price: Number(price),
         category,
         description,
         image:imagePath,
         seller: req.user   //seller: req.user.id
      });

      const savedListing = await newListing.save();
      console.log('Listing Saved Successfully:', savedListing._id);
      res.status(201).json(newListing);
   }catch(error){
      console.error("Detailed server error:", error);
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

exports.getListingById = async (req, res) => {
   try {
      const { id } = req.params;
      const listing = await Listing.findById(id).populate('seller', 'name email');

      if (!listing) {
         return res.status(404).json({ message: "Product not found in Database" });
      }
      res.status(200).json(listing);
   } catch (error) {
      console.error("Error in getListingById:", error);
      res.status(500).json({ message: "Server Error: Invalid ID format" });
   }
};