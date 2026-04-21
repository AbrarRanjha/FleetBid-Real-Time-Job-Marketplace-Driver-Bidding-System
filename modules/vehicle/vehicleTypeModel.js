const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageDescriptionSchema = new Schema({
    language_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Language',
        required: true,
    },
    vehicle_type: {
        type: String,
        required: true,
    },
    vehicle_type_detail: {
        type: String,
        default: "",
    },
});

const VehicleSchema = new Schema({
    vehicle_type: {
        type: String,
        required: true,
        enum: ['HGV', 'LGV', 'Car', 'Bus', 'Truck'], // Example vehicle types
    },
    person_capacity: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
        required: true,
    },
    status: {
        type: Number,
        default: 1,
    },
    is_deleted: {
        type: Number,
        default: 0,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    modified: {
        type: Date,
        default: Date.now,
    },
    capacity: {
        type: Number,
        required: true,
    },
    pages_descriptions: {
        en: PageDescriptionSchema,
        ar: PageDescriptionSchema,
    },
    weight_unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WeightUnit',
        required: true,
    },
    vehicle_type_detail: {
        type: String,
        required: true,
    },
});

// Ensure unique indexes for certain fields if needed
VehicleSchema.index({ slug: 1 }, { unique: true });

// Exporting the Vehicle model
const vehicleTypeModel = mongoose.model('vehicle_type', VehicleSchema, "vehicle_type");

module.exports = vehicleTypeModel;