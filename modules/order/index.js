const express = require('express');
const marketPlaceController = require('./controller');

const router = express.Router();



router.get('/order-history/:id', marketPlaceController.gerOrderHistory);
router.get('/order-detail/:id', marketPlaceController.gerOrderDetail);




module.exports = router;
