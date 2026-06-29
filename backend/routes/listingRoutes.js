const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const {createListing, getListings, getListingById, getMyListings, deleteListing} = require('../controllers/listingController');
const {protect} = require('../middleware/authMiddleware');

const upload = multer({storage});

router.get('/', getListings);
router.post('/', protect, upload.single('image'), createListing);
router.get('/my', protect, getMyListings);
router.get('/:id', getListingById);
router.delete('/:id', protect, deleteListing);

module.exports = router;