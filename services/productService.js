const ProductModel = require('../models/productModel');

const create = async ({ name, quantity }) => {
  const newProduct = await ProductModel.create({ name, quantity });

  return newProduct;
};

module.exports = {
  create,
};
