const admin = require("firebase-admin");
const Notification = require('./Model');
const UserModel = require('../user/Model');
const serviceAccount = require("./mausool-notification.json");


class marketPlaceService {
    async createNotification(data) {
        try {
            const { customer_id, job_item_id, title, message } = data
            const drivers = await UserModel.find({ user_type: "driver" })
            console.log("drivers", drivers.length);

            for (let index = 0; index < drivers.length; index++) {
                const element = drivers[index];
                const notification = { customer_id, job_item_id, title, message, driver_id: element._id }
                const res = new Notification(notification);
                await res.save();
            }
            return
        } catch (error) {
            throw new Error(`Error fetching the first user: ${error.message}`);
        }
    }
    async getNotification() {
        try {
            const notification = Notification.find().populate(`job_item_id`).populate(`driver_id`).populate('customer_id').populate({
                path: 'job_item_id',
                populate: [{ path: 'job_id' }, { path: 'order_id' }]
            });
            return notification;
        } catch (error) {
            throw new Error(`Error fetching the first user: ${error.message}`);
        }
    }
    async getDriverNotification(driver_id) {
        try {
            const notification = Notification.find({ driver_id, }).populate(`job_item_id`).populate(`driver_id`).populate('customer_id').populate({
                path: 'job_item_id',
                populate: [{ path: 'job_id' }, { path: 'order_id' }, { path: 'product_id' }]
            });
            return notification;
        } catch (error) {
            throw new Error(`Error fetching the first user: ${error.message}`);
        }
    }
    async getDriverUnseenNotification(driver_id) {
        try {
            const notification = Notification.find({ driver_id, is_seen: false }).populate(`job_item_id`).populate(`driver_id`).populate('customer_id').populate({
                path: 'job_item_id',
                populate: [{ path: 'job_id' }, { path: 'order_id' }, { path: 'product_id' }]
            });
            return notification;
        } catch (error) {
            throw new Error(`Error fetching the first user: ${error.message}`);
        }
    }
    async updateDriverUnseenNotification(driver_id) {
        try {
            const notification = Notification.updateMany({ driver_id }, { $set: { is_seen: true } });
            return notification;
        } catch (error) {
            throw new Error(`Error fetching the first user: ${error.message}`);
        }
    }
    async sendPushNotification(user, payload) {
        try {


            if (user.notificationToken) {
                if (admin.apps.length === 0) {
                    admin.initializeApp({
                        credential: admin.credential.cert(serviceAccount),
                    });
                }

                const message = {
                    token: user.notificationToken,
                    notification: {
                        title: payload.notification.title,
                        body: payload.notification.body,
                    },
                    // Add additional data if needed
                    data: payload.data || {},
                }; console.log("message", message);


                // admin.messaging().sendToDevice(params.registrationTokens, params.payload, params.options)
                const res = await admin.messaging().send(message)
                    .then(function (response) {
                        console.log("ress", response);

                        return response


                    })

                    .catch(function (error) {
                        console.log("catch", error);

                        return error
                    });


                // const newRecord = await new Notification({ title: payload.notification.title, body: payload.notification.body, userId: user._id });
                // const data = await newRecord.save();
                // await UserService.updateNotificationById(user._id, data)


                return res
            } else {
                // const newRecord = await new Notification({ title: payload.notification.title, body: payload.notification.body, userId: user._id });
                // const data = await newRecord.save();
                // await UserService.updateNotificationById(user._id, data)
            }
        } catch (error) {
            console.log("error: " + error);

        }
    }
}

module.exports = new marketPlaceService();
