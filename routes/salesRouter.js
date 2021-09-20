const express = require('express');
const SalesController = require('../controllers/salesController');

const router = express.Router();

router.get('/', SalesController.getAll);
router.get('/:id', SalesController.getByID);
router.post('/', SalesController.create);

module.exports = router;
