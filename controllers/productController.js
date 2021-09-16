const ProductService = require('../services/productService');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await ProductService.create({ name, quantity });

  if (newProduct.err) {
    return res.status(422).json(newProduct);
  }

  res.status(201).json(newProduct);
};

const getAll = async (_req, res) => {
  const products = await ProductService.getAll();

  res.status(200).json({ products });
};

const getByID = async (req, res) => {
  const { id } = req.params;

  const product = await ProductService.getByID(id);

  if (product.err) return res.status(422).json(product);

  res.status(200).json(product);
};

const update = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;

  const productUpdated = await ProductService.update({ id, name, quantity });

  if (productUpdated.err) return res.status(422).json(productUpdated);

  res.status(200).json(productUpdated);
};

module.exports = {
  create,
  getAll,
  getByID,
  update,
};
