const express = require('express');
const marketPlaceController = require('./controller');

const router = express.Router();



router.get('/', marketPlaceController.gerOrderHistory);
router.put('/update-location/:driver_id', marketPlaceController.updateDriverLocation);
router.post('/get-Driver', marketPlaceController.updateDriverLocation);
router.post('/nearest-drivers', marketPlaceController.getNearestDrivers);
router.post('/get-drivers', marketPlaceController.getCompanyDrivers);




module.exports = router;
