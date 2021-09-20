const express = require('express');
const SalesController = require('../controllers/salesController');

const router = express.Router();

router.get('/', SalesController.getAll);
router.post('/', SalesController.create);

module.exports = router;
