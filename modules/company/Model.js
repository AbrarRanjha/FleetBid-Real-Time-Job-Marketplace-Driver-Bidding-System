const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const companySchema = new mongoose.Schema({
    company_name: { type: String, required: true },
    logo: { type: String },
    banner: { type: String },
    address: { type: String },
    post_code: { type: String },
    mobile_number: { type: String },
    country_code: { type: String },
    phone_number: { type: String },
    company_type: { type: String },
    industry_id: { type: Schema.Types.ObjectId, ref: 'Industry' },
    country_id: { type: Schema.Types.ObjectId, ref: 'Country' },
    state_id: { type: Schema.Types.ObjectId, ref: 'State' },
    city_id: { type: String },
    fax_number: { type: String },
    cr_number: { type: String },
    vat_registration_number: { type: String },
    expiration_date: { type: Date },
    alternate_country_code: { type: String },
    alternate_mobile_number: { type: String },
    alternate_contact_number: { type: String },
    no_of_inventories: { type: String },
    pages_descriptions: {
        en: {
            language_id: { type: Schema.Types.ObjectId, ref: 'Language' },
            company_name: { type: String },
        },
        ar: {
            language_id: { type: Schema.Types.ObjectId, ref: 'Language' },
            company_name: { type: String },
        }
    },
    slug: { type: String },
    is_admin_approved: { type: Number, default: 0 },
    status: { type: Number, default: 1 },
    is_deleted: { type: Number, default: 0 },
    average_rating: { type: Number, default: 0 },
    total_reviews: { type: Number, default: 0 },
    created: { type: Date, default: Date.now },
    modified: { type: Date, default: Date.now },
    earning_type: { type: String },
    membership_plan_list: [{ type: Schema.Types.ObjectId, ref: 'MembershipPlan' }],
    per_user_cost: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    per_order_commission: { type: Number, default: 0 },
    is_membership: { type: Number, default: 0 },
    is_company_plan_active: { type: Number, default: 0 },
    is_approve_with_membership_plan: { type: Number, default: 0 },
    is_approve_with_commission_plan: { type: Number, default: 0 },
    company_approved_on: { type: Date },
    allow_sub_users: { type: Number, default: 0 },
    membership_plan_id: { type: Schema.Types.ObjectId, ref: 'MembershipPlan' },
    plan_cost: { type: Number, default: 0 },
    order_branch_id: { type: String },
});

const companyModel = mongoose.model('company', companySchema, "company");

module.exports = companyModel;
