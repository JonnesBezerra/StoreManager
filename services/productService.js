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

const quantityValidator = (quantity) => {
  if (quantity <= 0) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }

  return false;
};

const create = async ({ name, quantity }) => {
  const validateName = await nameValidator(name);
  if (validateName) return validateName;

  const validateQuantity = quantityValidator(quantity);
  if (validateQuantity) return validateQuantity;

  const newProduct = await ProductModel.create({ name, quantity });
  return newProduct;
};

module.exports = {
  create,
};
