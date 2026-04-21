const express = require('express');
const marketPlaceController = require('./controller');

const router = express.Router();



router.get('/order-history', marketPlaceController.gerOrderHistory);
router.post('/get-vehicle', marketPlaceController.getVehicle);




module.exports = router;
