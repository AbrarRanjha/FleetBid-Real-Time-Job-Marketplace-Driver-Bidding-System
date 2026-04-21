const mongoose = require('mongoose');
const User = require('../user/Model');
const jobItemModel = require('../job/jobItemsModel');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    driver_id: { type: Schema.Types.ObjectId, ref: User, required: true },
    customer_id: { type: Schema.Types.ObjectId, ref: User, required: true },
    job_item_id: { type: Schema.Types.ObjectId, ref: jobItemModel, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    is_seen: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    seen_at: { type: Date }
});

const Notification = mongoose.model('marketPlaceNotification', NotificationSchema);

module.exports = Notification;
