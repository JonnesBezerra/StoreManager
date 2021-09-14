const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/', productController.create);
router.get('/', productController.getAll);

module.exports = router;
