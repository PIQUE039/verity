const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const {createListing, getListings, getListingById, getMyListings, deleteListing} = require('../controllers/listingController');
const {protect} = require('../middleware/authMiddleware');

//Multer configuration
const storage = multer.diskStorage({
   destination:(req,file,cb)=>{
      cb(null, 'uploads/');
   },
   filename:(req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
   }
});

const upload = multer({storage:storage});
// ---

router.get('/', getListings);
router.post('/', protect, upload.single('image'), createListing);
router.get('/my', protect, getMyListings);
router.get('/:id', getListingById);
router.delete('/:id', protect, deleteListing);

module.exports = router;