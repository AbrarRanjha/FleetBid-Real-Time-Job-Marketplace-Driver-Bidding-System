const mongoose = require('mongoose');
const productCategoryModel = require('./productcategory');
const Schema = mongoose.Schema;


const productSchema = new mongoose.Schema({
    product_name: { type: String, required: true },
    short_details: { type: String, required: true },
    description: { type: String, required: true },
    product_image: { type: String, required: true },
    company_id: { type: Schema.Types.ObjectId, ref: 'company', required: true },
    category_id: { type: Schema.Types.ObjectId, ref: productCategoryModel, required: true },
    sub_category_id: { type: Schema.Types.ObjectId, ref: 'subCategory', required: true },
    weight_unit: { type: Schema.Types.ObjectId, ref: 'weightUnit', required: true },
    sku: { type: String, required: true },
    pages_descriptions: {
        en: {
            language_id: { type: Schema.Types.ObjectId, ref: 'Language', required: true },
            product_name: { type: String, required: true },
            short_details: { type: String, required: true },
            description: { type: String, required: true }
        },
        ar: {
            language_id: { type: Schema.Types.ObjectId, ref: 'Language', required: true },
            product_name: { type: String, default: "" },
            short_details: { type: String, default: "" },
            description: { type: String, default: "" }
        }
    },
    sold_unit: { type: Schema.Types.ObjectId, ref: 'soldUnit', required: true },
    product_weight: { type: String, required: true },
    product_price_with_out_tax: { type: Number, required: true },
    tax: { type: Number, required: true },
    tax_amount: { type: Number, required: true },
    product_price: { type: Number, required: true },
    minimum_sold_unit: { type: Number, required: true },
    featured: { type: Boolean, default: false },
    slug: { type: String, required: true },
    status: { type: Number, required: true },
    is_deleted: { type: Boolean, default: false },
    created: { type: Date, default: Date.now },
    modified: { type: Date, default: Date.now }

});

const productModel = mongoose.model('product', productSchema,);

module.exports = productModel;
