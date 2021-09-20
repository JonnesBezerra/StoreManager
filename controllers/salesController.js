const SalesService = require('../services/salesService');

const create = async (req, res) => {
  const itensSold = req.body;

  const newSale = await SalesService.create(itensSold);

  if (newSale.err) return res.status(422).json(newSale);
  
  res.status(200).json(newSale);
};

const getAll = async (req, res) => {
  const allSales = await SalesService.getAll();

  res.status(200).json(allSales);
};

module.exports = {
  create,
  getAll,
};
