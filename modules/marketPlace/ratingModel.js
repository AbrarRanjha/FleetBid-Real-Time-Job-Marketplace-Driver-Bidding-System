const mongoose = require('mongoose');
const User = require('../user/Model');

// Define the schema for the Job model
const ratingSchema = new mongoose.Schema({
    driver_id: { type: mongoose.Schema.Types.ObjectId, ref: User, required: false },
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },

    rating: { type: Number, required: false, },
    review: { type: String, required: false, },


});

const ratingModel = mongoose.model('rating', ratingSchema, 'rating');

module.exports = ratingModel;
