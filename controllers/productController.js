const ProductService = require('../services/productService');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await ProductService.create({ name, quantity });

  if (newProduct.err) {
    return res.status(422).json(newProduct);
  }

  // console.log('controller: ', newProduct.insertedId);

  res.status(201).json(newProduct);
};

module.exports = {
  create,
};
