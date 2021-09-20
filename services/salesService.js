const SalesModel = require('../models/salesModel');
const ProductModel = require('../models/productModel');

const quantityValidator = (itemsSold) => {
  const biggerThanZero = itemsSold.every((item) => item.quantity > 0);
  const isNumber = itemsSold.every((item) => !Number.isNaN(item.quantity));

  if (!biggerThanZero && isNumber) {
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

const idFormatValidator = (sale) => {
  if (!sale) return { err: { code: 'invalid_data', message: 'Wrong sale ID format' } };

  return false;
};

const amountValidator = (quantity) => {
  if (!quantity) {
    return {
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
      },
    }; 
  }

  return false;
};

const create = async (itensSold) => {
  const validateAmount = quantityValidator(itensSold);
  if (validateAmount) return validateAmount;
  
  const newSale = await SalesModel.create(itensSold);
  const quantityOK = await ProductModel.updateQuantity('decrease', itensSold);

  const isQuantityOK = amountValidator(quantityOK);
  if (isQuantityOK) return isQuantityOK;

  return newSale;
};

const getAll = async () => SalesModel.getAll();

const getByID = async (id) => {
  const sale = await SalesModel.getByID(id);

  const idError = idNotExists(sale);
  if (idError) return idError;

  return sale;
};

const update = async (updateSale) => {
  const { itensSold } = updateSale;
  const validateQuantity = quantityValidator(itensSold);
  if (validateQuantity) return validateQuantity;

  const saleUpdated = SalesModel.update(updateSale);
  return saleUpdated;
};

const deleteSale = async (id) => {
  const saleDeleted = await SalesModel.deleteSale(id);

  const idError = idFormatValidator(saleDeleted);
  if (idError) return idError;

  await ProductModel.updateQuantity('increase', saleDeleted.itensSold);

  return saleDeleted;
};

module.exports = {
  create,
  getAll,
  getByID,
  update,
  deleteSale,
};
