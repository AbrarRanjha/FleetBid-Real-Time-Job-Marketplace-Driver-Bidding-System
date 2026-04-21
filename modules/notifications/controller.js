const notificationService = require('./service');

class marketPlaceController {
    async notifications(req, res) {
        try {
            const savedNotification = await notificationService.createNotification(req.body)           // Create a new notification documen
            res.status(200).json({
                status: 'success',
                message: 'Notification created successfully',
                data: savedNotification
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async getAllNotifications(req, res) {
        try {
            const savedNotification = await notificationService.getNotification()           // Create a new notification documen
            res.status(200).json({
                status: 'success',
                message: 'Notification created successfully',
                data: savedNotification
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async getDriverNotifications(req, res) {
        try {
            const { driver_id } = req.params
            const savedNotification = await notificationService.getDriverNotification(driver_id)           // Create a new notification documen
            res.status(200).json({
                status: 'success',
                message: 'Notification created successfully',
                data: savedNotification
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async updateSeenNotifications(req, res) {
        try {
            const { driver_id } = req.params
            const savedNotification = await notificationService.updateDriverUnseenNotification(driver_id)           // Create a new notification documen
            res.status(200).json({
                status: 'success',
                message: 'Notification update successfully',
                data: savedNotification
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async getDriverUnseenNotifications(req, res) {
        try {
            const { driver_id } = req.params
            const savedNotification = await notificationService.getDriverUnseenNotification(driver_id)           // Create a new notification documen
            res.status(200).json({
                status: 'success',
                message: 'Notification created successfully',
                data: savedNotification
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async sendNotification(req, res) {
        try {
            const { fcm } = req.body
            console.log("fcm", fcm);

            const payload = {
                "notification": {
                    "title": " Profile",
                    "body": "Please Complete Your Profile",
                }
            }
            const user = {
                notificationToken: fcm
            }
            const savedNotification = await notificationService.sendPushNotification(user, payload)           // Create a new notification documen
            res.status(200).json({
                status: 'success',
                message: 'Notification created successfully',
                data: savedNotification
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new marketPlaceController();
