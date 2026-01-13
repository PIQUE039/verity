const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
   sender_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },
   receiver_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },
   listing_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Listing',
      required: true,
   },
   message:{
      type: String,
      required: true,
   },
   createdAt:{
      type: Date,
      default: Date.now,
   },
});

module.exports = mongoose.model('Chat', chatSchema);