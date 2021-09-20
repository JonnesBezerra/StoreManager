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

const getByID = async (req, res) => {
  const { id } = req.params;
  const sale = await SalesService.getByID(id);

  if (sale.err) return res.status(404).json(sale);

  res.status(200).json(sale);
};

const update = async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;

  const saleUpdated = await SalesService.update({ id, itensSold });

  if (saleUpdated.err) return res.status(422).json(saleUpdated);

  res.status(200).json(saleUpdated);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const saleDeleted = await SalesService.deleteSale(id);

  res.status(200).json(saleDeleted);
};

module.exports = {
  create,
  getAll,
  getByID,
  update,
  deleteSale,
};
