const mongoose = require('mongoose');
const vehicleTypeModel = require('./vehicleTypeModel');
const Schema = mongoose.Schema;


const vehicleSchema = new mongoose.Schema({
    brand_id: { type: Schema.Types.ObjectId, ref: 'brand', required: true },
    vehicle_type: { type: Schema.Types.ObjectId, ref: vehicleTypeModel, required: true },
    vehicle_category: { type: Schema.Types.ObjectId, ref: 'vehicleCategory', required: true },
    model_id: { type: Schema.Types.ObjectId, ref: 'model', required: true },
    owner_id: { type: Schema.Types.ObjectId, ref: 'owner', required: true },
    color_id: { type: Schema.Types.ObjectId, ref: 'color', required: true },
    capacity: { type: String, required: true },
    company_id: { type: Schema.Types.ObjectId, ref: 'company', required: true },
    year: { type: Number, required: true },
    licence_plate_no: { type: String, required: true },
    registration_no: { type: String, required: true },
    status: { type: Number, required: true },
    is_approved: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
    created: { type: Date, default: Date.now },
    modified: { type: Date, default: Date.now }
});

const vehicleModel = mongoose.model('vehicle', vehicleSchema,);

module.exports = vehicleModel;
