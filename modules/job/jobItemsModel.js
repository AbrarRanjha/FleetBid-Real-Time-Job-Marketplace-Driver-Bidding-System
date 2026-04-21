const mongoose = require('mongoose');
const JobModel = require('./Model');
const productModel = require('../product/Model');
const OrderModel = require('../order/Model');
const { Schema } = require('mongoose');

// Define the schema for the Job model
const ProductDescriptionSchema = new Schema({
    language_id: { type: Schema.Types.ObjectId, ref: 'Language', required: true },
    product_name: { type: String, default: "" },
    short_details: { type: String, default: "" },
    description: { type: String, default: "" }
});

const SoldUnitDetailsSchema = new Schema({
    language_id: { type: Schema.Types.ObjectId, ref: 'Language', required: true },
    name: { type: String, default: "" },
    help_text: { type: String, default: "" }
});
const jobItemsSchema = new mongoose.Schema({
    job_id: { type: Schema.Types.ObjectId, ref: JobModel, required: true }, // Reference to the job
    branch_id: { type: Schema.Types.ObjectId, ref: 'branch', required: true }, // Reference to the branch
    product_id: { type: Schema.Types.ObjectId, ref: productModel, required: true }, // Reference to the product
    product_name: { type: String, required: true }, // Product name
    pages_descriptions: {
        en: { type: ProductDescriptionSchema, required: true },
        ar: { type: ProductDescriptionSchema, required: true }
    },
    sold_unit_details: {
        en: { type: SoldUnitDetailsSchema, required: true },
        ar: { type: SoldUnitDetailsSchema, required: true }
    },
    order_id: { type: Schema.Types.ObjectId, ref: OrderModel, required: true }, // Reference to the order
    product_quantity: { type: Number, required: true }, // Quantity of the product
    product_total_price: { type: Number, required: true }, // Total price of the product
    product_price: { type: Number, required: true }, // Price per unit of the product
    created: { type: Date, default: Date.now }, // Date the order item was created
    driver_is_received: { type: Boolean, default: false }, // Whether the driver has received the product
    driver_receive_quantity: { type: Number, default: 0 }, // Quantity the driver has received
    driver_remark: { type: String, default: "" }, // Driver's remark about the product
    customer_is_received: { type: Boolean, default: false }, // Whether the customer has received the product
    customer_receive_quantity: { type: Number, default: 0 }, // Quantity the customer has received
    customer_receive_status: { type: Boolean, default: false }, // Whether the customer received the product in good condition
    customer_remark: { type: String, default: "" } // Customer's remark about the product

});

const JobItemsModel = mongoose.model('job_item', jobItemsSchema, 'job_item');

module.exports = JobItemsModel;
