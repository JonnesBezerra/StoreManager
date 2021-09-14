const ProductModel = require('../models/productModel');

const create = async ({ name, quantity }) => {
  if (name.length < 5 || !name) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }

  const newProduct = await ProductModel.create({ name, quantity });
  return newProduct;
};

module.exports = {
  create,
};
