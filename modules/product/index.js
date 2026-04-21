const express = require('express');
const marketPlaceController = require('./controller');

const router = express.Router();



router.get('/', marketPlaceController.gerOrderHistory);




module.exports = router;
