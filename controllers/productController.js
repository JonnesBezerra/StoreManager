const ProductService = require('../services/productService');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await ProductService.create({ name, quantity });

  if (!newProduct) {
    return res
      .status(400)
      .json({ message: 'Invalid data!' });
  }

  res.status(201).json(newProduct);
};

module.exports = {
  create,
};
