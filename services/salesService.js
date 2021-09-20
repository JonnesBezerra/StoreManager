const SalesModel = require('../models/salesModel');
const ProductModel = require('../models/productModel');

const amountValidator = (itemsSold) => {
  const biggerOrNot = itemsSold.every((item) => item.quantity > 0);

  if (!biggerOrNot) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }

  return false;
};

const idNotExists = (sale) => {
  if (!sale) return { err: { code: 'not_found', message: 'Sale not found' } };

  return false;
};

const create = async (itensSold) => {
  const validateAmount = amountValidator(itensSold);
  if (validateAmount) return validateAmount;
  
  const newSale = await SalesModel.create(itensSold);
  await ProductModel.updateQuantity('decrease', itensSold);

  return newSale;
};

const getAll = async () => SalesModel.getAll();

const getByID = async (id) => {
  const sale = await SalesModel.getByID(id);

  const idError = idNotExists(sale);
  if (idError) return idError;

  return sale;
};

module.exports = {
  create,
  getAll,
  getByID,
};
