const express = require('express');
const SalesController = require('../controllers/salesController');

const router = express.Router();

router.post('/', SalesController.create);

module.exports = router;
