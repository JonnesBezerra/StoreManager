const SalesService = require('../services/salesService');

const create = async (req, res) => {
  const itensSold = req.body;

  const newSale = await SalesService.create(itensSold);
  
  res.status(200).json(newSale);
};

module.exports = {
  create,
};
