const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productCategorySchema = new mongoose.Schema({
    category_name: { type: String, required: true },
    parent_id: { type: Schema.Types.Mixed, default: 0 }, // Can be 0 or an ObjectId if needed in future
    company_id: { type: Schema.Types.ObjectId, ref: 'company', required: true },
    slug: { type: String, required: true },
    description: { type: String, default: "" },
    category_image: { type: String, default: "" },
    banner_image: { type: String, default: "" },
    pages_descriptions: {
        en: {
            language_id: { type: Schema.Types.ObjectId, ref: 'Language', required: true },
            category_name: { type: String, required: true }
        },
        ar: {
            language_id: { type: Schema.Types.ObjectId, ref: 'Language', required: true },
            category_name: { type: String, default: "" }
        }
    },
    status: { type: Number, required: true },
    created: { type: Date, default: Date.now },
    modified: { type: Date, default: Date.now }
}, { collection: 'product_categories' });

const productCategoryModel = mongoose.model('productCategory', productCategorySchema);

module.exports = productCategoryModel;
