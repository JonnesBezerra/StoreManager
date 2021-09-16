const ProductModel = require('../models/productModel');

const repeatedNameValidator = async (name) => {
  const existingName = await ProductModel.findByName(name);
  if (existingName) return { err: { code: 'invalid_data', message: 'Product already exists' } };

  return false;
};

const nameLengthValidator = async (name) => {
  if (name.length < 5 || !name) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }

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

  if (typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }

  return false;
};

const idFormatValidator = (product) => {
  if (!product) return { err: { code: 'invalid_data', message: 'Wrong id format' } };

  return false;
};

const create = async ({ name, quantity }) => {
  const validateNameLength = await nameLengthValidator(name);
  if (validateNameLength) return validateNameLength;

  const validateRepeatName = await repeatedNameValidator(name);
  if (validateRepeatName) return validateRepeatName;

  const validateQuantity = quantityValidator(quantity);
  if (validateQuantity) return validateQuantity;

  const newProduct = await ProductModel.create({ name, quantity });
  return newProduct;
};

const getAll = async () => ProductModel.getAll();

const getByID = async (id) => {
  const product = await ProductModel.getByID(id);

  const idError = idFormatValidator(product);
  if (idError) return idError;

  return product;
};

const update = async ({ id, name, quantity }) => {
  const validateName = await nameLengthValidator(name);
  if (validateName) return validateName;

  const validateQuantity = quantityValidator(quantity);
  if (validateQuantity) return validateQuantity;

  const productUpdated = await ProductModel.update({ id, name, quantity });
  return productUpdated;
};

const deleteProduct = async (id) => {
  const productDeleted = await ProductModel.deleteProduct(id);

  const idError = idFormatValidator(productDeleted);
  if (idError) return idError;

  return productDeleted;
};

module.exports = {
  create,
  getAll,
  getByID,
  update,
  deleteProduct,
};
