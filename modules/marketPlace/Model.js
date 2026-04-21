const mongoose = require('mongoose');
const User = require('../user/Model');
const JobItemModel = require('../job/jobItemsModel');
const vehicleModel = require('../vehicle/Model');
const companyModel = require('../company/Model');

// Define the schema for the Job model
const marketPlaceSchema = new mongoose.Schema({
    job_item_id: { type: mongoose.Schema.Types.ObjectId, ref: JobItemModel, required: false },
    driver_id: { type: mongoose.Schema.Types.ObjectId, ref: User, required: false },
    company_id: { type: mongoose.Schema.Types.ObjectId, ref: companyModel, required: false },
    assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: User, required: false },
    vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: vehicleModel, required: false },
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: User, required: false },
    quotation_amount: { type: Number, required: false },
    bid_status: { type: String, default: 'available', },
    is_approved: { type: Boolean, default: false, },
    is_rejected: { type: Boolean, default: false, },
    is_close: { type: Boolean, default: false, },
    is_deleted: { type: Boolean, default: false, },
    is_quotation_submitted: { type: Boolean, default: false, },
    is_shipping_amount_received: { type: Boolean, default: false, },
    mausool_cost_amount: { type: Number, required: false, },
    quotation_date: { type: Date, required: false },
    approved_date: { type: Date, required: false },

});

const marketPlaceModel = mongoose.model('marketPlace', marketPlaceSchema, 'marketPlace');

module.exports = marketPlaceModel;
