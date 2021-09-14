const ProductService = require('../services/productService');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await ProductService.create({ name, quantity });

  if (newProduct.err) {
    return res.status(422).json(newProduct);
  }

  res.status(201).json({
    _id: newProduct.insertedId,
    name,
    quantity,
  });
};

module.exports = {
  create,
};
