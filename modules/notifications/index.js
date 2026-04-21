const express = require('express');
const marketPlaceController = require('./controller');

const router = express.Router();



router.post('/', marketPlaceController.notifications);
router.get('/', marketPlaceController.getAllNotifications);
router.get('/driver-notification/:driver_id', marketPlaceController.getDriverNotifications);
router.get('/driver-unseen/:driver_id', marketPlaceController.getDriverUnseenNotifications);
router.put('/driver-seen/:driver_id', marketPlaceController.updateSeenNotifications);
router.put('/sendNotification', marketPlaceController.sendNotification);




module.exports = router;
