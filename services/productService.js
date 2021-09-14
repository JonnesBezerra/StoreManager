const ProductModel = require('../models/productModel');

const nameValidator = async (name) => {
  if (name.length < 5 || !name) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }

  const existingName = await ProductModel.findByName(name);
  if (existingName) return { err: { code: 'invalid_data', message: 'Product already exists' } };

  return false;
};

const create = async ({ name, quantity }) => {
  const validateName = await nameValidator(name);
  if (validateName) return validateName;

  const newProduct = await ProductModel.create({ name, quantity });
  return newProduct;
};

module.exports = {
  create,
};
