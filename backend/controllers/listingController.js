const Listing = require('../models/Listing');

exports.createListing = async (req, res) =>{
   
   try{
      //Safety check: if multer failed, req.body might be empty
      if(!req.body || Object.keys(req.body).length === 0){
         return res.status(400).json({message: "Form data is missing. Make sure Multer is configured in routes."});
      }
      const {title, description, price, category} = req.body;

      const imagePath = req.file ? req.file.path : '';

      const newListing = new Listing({
         title,
         price: Number(price),
         category,
         description,
         image:imagePath,
         seller: req.user
      });

      await newListing.save();
      res.status(201).json(newListing);
   }catch(error){
      console.error("Detailed server error:", error);
      res.status(500).json({message:"Error creating listing"});
   }
};

exports.getListings = async (req, res) =>{
   try{
      const { search , category } = req.query;

      const query = {};

      if(search){
         query.$or =[
            { title: {$regex: search, $options: 'i'}},
            { description: {$regex: search, $options: 'i'}}
         ];
      }

      if(category){
         query.category = category;
      }

      const listings = await Listing.find(query).populate('seller', 'name');
      res.status(200).json(listings);
   }catch(error){
      res.status(500).json({message: "Error fetching listings"});
   }
};

exports.getListingById = async (req, res) => {
   try {
      const { id } = req.params;
      const listing = await Listing.findById(id).populate('seller', 'name createdAt');

      if (!listing) {
         return res.status(404).json({ message: "Product not found in Database" });
      }
      res.status(200).json(listing);
   } catch (error) {
      console.error("Error in getListingById:", error);
      res.status(500).json({ message: "Server Error: Invalid ID format" });
   }
};

exports.getMyListings = async (req, res) => {
   try {
      const listings = await Listing.find({ seller: req.user })
                                    .sort({ createdAt: -1 });
      res.status(200).json(listings);
   } catch (error) {
      res.status(500).json({ message: "Error fetching your listings" });
   }
};

exports.deleteListing = async (req, res) => {
   try{
      const { id } = req.params;
      const listing = await Listing.findById(id);
      
      if(!listing){
         return res.status(404).json({message:"Listing not found"});
      }

      //ownership check
      if(listing.seller.toString() !== req.user){
         return res.status(403).json({message:"You are not the owner of this listing."});
      }

      //deleting
      await Listing.findByIdAndDelete(id);
      res.status(200).json({message:"Listing deleted successfully"});

   }catch(error){
      res.status(500).json({message:"Error deleting listing"});
   }
};