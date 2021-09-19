const SalesModel = require('../models/salesModel');
const ProductModel = require('../models/productModel');

const amountValidator = (itemsSold) => {
  const biggerOrNot = itemsSold.every((item) => item.quantity > 0);

  if (!biggerOrNot) {
    console.log('é menor que zero');
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }

  return false;
};

const create = async (itensSold) => {
  const validateAmount = amountValidator(itensSold);
  if (validateAmount) return validateAmount;
  
  const newSale = await SalesModel.create(itensSold);
  await ProductModel.updateQuantity('decrease', itensSold);

  return newSale;
};

module.exports = {
  create,
};
