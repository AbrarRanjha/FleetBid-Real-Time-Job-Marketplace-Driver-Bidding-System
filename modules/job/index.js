const express = require('express');
const jobeController = require('./controller');

const router = express.Router();
router.get('/job-history/:id', jobeController.getOrderHistory);

module.exports = router;
