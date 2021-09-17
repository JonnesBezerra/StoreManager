const SalesModel = require('../models/salesModel');
const ProductModel = require('../models/productModel');

const create = async (itensSold) => {
  const newSale = await SalesModel.create(itensSold);
  const updateResult = await ProductModel.updateQuantity('decrease', itensSold);

  if (!updateResult) {
    return { 
      error: { code: 'STOCK_PROBLEM', message: 'Such amount is not permitted to sell' }, 
    };
  }

  return newSale;
};

module.exports = {
  create,
};
