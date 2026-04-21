const mongoose = require('mongoose');

// Define the schema for the Job model
const orderSchema = new mongoose.Schema({
    order_no: { type: String, required: true },
    order_amount: { type: Number, default: 0 },
    order_quantity: { type: Number, default: 0 },
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    customer_name: { type: String, required: true },
    customer_email: { type: String, required: true },
    customer_mobile_number: { type: String, required: true },
    rfq_id: { type: mongoose.Schema.Types.ObjectId, ref: 'RFQ', required: true },
    shipping_address: {
        location: { type: String, required: true },
        latitude: { type: String, required: true },
        longitude: { type: String, required: true },
    },
    billing_address: {
        location: { type: String, required: true },
        latitude: { type: String, required: true },
        longitude: { type: String, required: true },
    },
    company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    is_deleted: { type: Boolean, default: false },
    is_payment_settled: { type: Boolean, default: false },
    admin_commission_settled: { type: Boolean, default: false },
    admin_commission_percentage: { type: Number, default: 0 },
    admin_commission_amount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    tax_amount: { type: Number, default: 0 },
    order_amount_with_out_tax: { type: Number, default: 0 },
    amount_to_be_paid_by_customer: { type: Number, default: 0 },
    total_order_tax_amount: { type: Number, default: 0 },
    status: { type: String, enum: ['created', 'pending', 'completed'], default: 'created' },
    total_job: { type: Number, default: 0 },
    is_order_completed: { type: Boolean, default: false },
    job_item_quantity: { type: Number, default: 0 },
    order_type: { type: String, enum: ['external', 'internal'], default: 'external' },
    is_job_assign_to_mausool: { type: Boolean, default: false },
    is_customer_own_shipping: { type: String, enum: ['yes', 'no'], default: 'no' },
    is_genrate_order_pdf: { type: Boolean, default: false },
    created: { type: Date, default: Date.now },
    modified: { type: Date, default: Date.now },
    delivery_charges: { type: Number, default: 0 },
    job_delivery_charges_data: [
        {
            job_id: { type: String },
            charges: { type: Number },
        }
    ],
    admin_commission_vat_amount: { type: Number, default: 0 },
    admin_commission_vat_percentage: { type: Number, default: 0 },
    admin_commission_with_out_vat_amount: { type: Number, default: 0 },
    is_generate_commission_pdf: { type: Boolean, default: false }
});

// Create the Job model
const OrderModel = mongoose.model('order', orderSchema, 'order');

module.exports = OrderModel;
