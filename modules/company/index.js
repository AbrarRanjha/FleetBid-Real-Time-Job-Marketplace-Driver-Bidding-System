const express = require('express');
const marketPlaceController = require('./controller');

const router = express.Router();



router.get('/order-history', marketPlaceController.gerOrderHistory);




module.exports = router;
