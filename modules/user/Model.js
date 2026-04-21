const mongoose = require('mongoose');
const companyModel = require('../company/Model');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    full_name: { type: String, required: true },
    email: { type: String, required: true },
    mobile_number: { type: String, required: true },
    mobile: { type: String, required: true },
    mobile_code: { type: String, required: true },
    address: { type: String, default: "" },
    zip_code: { type: String, default: "" },
    mobile_otp: { type: String, default: "" },
    email_otp: { type: Number, required: true },
    password: { type: String, required: true },
    temp_password: { type: String, default: "" },
    is_verified: { type: Boolean, default: false },
    gender: { type: String, enum: ['1', '2'], required: true }, // Assuming '1' for male, '2' for female
    is_mobile_verified: { type: Boolean, default: false },
    is_email_verified: { type: Boolean, default: false },
    is_admin_approved: { type: Boolean, default: false },
    is_profile_complete: { type: Boolean, default: false },
    is_document_verified: { type: Boolean, default: false },
    is_vehicle_document_complete: { type: Boolean, default: false },
    is_vehicle_verified: { type: Boolean, default: false },
    is_bank_detail_complete: { type: Boolean, default: false },
    is_document_complete: { type: Boolean, default: false },
    is_online: { type: Boolean, default: false },
    is_on_ride: { type: Boolean, default: false },
    is_inprocess_ride: { type: Boolean, default: false },
    total_jobs: { type: Number, default: 0 },
    user_type: { type: String, enum: ['driver', 'rider'], required: true }, // Assuming roles
    driver_type: { type: String, default: "" },
    user_role_id: { type: Schema.Types.ObjectId, ref: 'UserRole', required: true },
    on_off_status: { type: Boolean, default: true },
    api_type: { type: String, default: "mobile" },
    is_deleted: { type: Boolean, default: false },
    is_membership: { type: Boolean, default: false },
    is_reupload_personal_document: { type: Boolean, default: false },
    is_reupload_vehicle_document: { type: Boolean, default: false },
    temp_email: { type: String, default: "" },
    temp_mobile_number: { type: String, default: "" },
    temp_mobile_number_code: { type: String, default: "" },
    validate_string: { type: String, default: "" },
    otp_verification_code_time: { type: Date, default: Date.now },
    average_rating: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    device_id: { type: String, default: "" },
    device_token: { type: String, default: "" },
    device_type: { type: String, enum: ['android', 'ios'], default: "android" }, // Assuming two types
    wallet_balance: { type: Number, default: 0 },
    company_id: { type: Schema.Types.ObjectId, ref: companyModel, required: true },
    slug: { type: String, required: true },
    created: { type: Date, default: Date.now },
    modified: { type: Date, default: Date.now },
    temp_mobile_with_code: { type: String, default: "" },
    about_youself: { type: String, default: "" },
    is_first_step_complete: { type: Boolean, default: false },
    profile_image: { type: String, default: "" },
    city_name: { type: String, default: "" },
    country_id: { type: Schema.Types.ObjectId, ref: 'Country', required: true },
    date_of_birth: { type: Date, required: true },
    is_second_step_complete: { type: Boolean, default: false },
    location: {
        type: {
            type: String,
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            default: [0, 0], // Default coordinates
        },
    },
    post_code: { type: String, default: "" },
    state_id: { type: Schema.Types.ObjectId, ref: 'State', required: true },
    vehicle_category: { type: Schema.Types.ObjectId, ref: 'VehicleCategory', required: true },
    vehicle_type: { type: Schema.Types.ObjectId, ref: 'VehicleType', required: true },
    bank_details: {
        bank_name: { type: String, default: "" },
        account_number: { type: String, default: "" },
        iban_number: { type: String, default: "" },
        account_name: { type: String, default: "" }
    },
    device_details: [{
        device_type: { type: String, default: "" },
        device_token: { type: String, default: "" },
        device_id: { type: String, default: "" }
    }],
    last_login: { type: Date, default: Date.now },
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 },
    location_coordinates: [{ type: Number, default: 0 }],
    earning_type: { type: String, default: "membership_plan" },
    is_driver_plan_active: { type: Boolean, default: false },
    per_order_commission: { type: String, default: "" },
    login_with_otp_code: { type: String, default: "" },
    notificationToken: { type: String, required: false },
});

UserSchema.index({ location: '2dsphere' });
const User = mongoose.model('User', UserSchema);
module.exports = User;
