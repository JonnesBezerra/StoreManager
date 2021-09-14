const connection = require('./connection');

const PRODUCTS = 'products';

const getAll = async () => {
  const db = await connection();
  const allProducts = await db.collection(PRODUCTS).find().toArray();
  return allProducts;
};

const create = async ({ name, quantity }) => {
  const db = await connection();
  const newProduct = await db.collection(PRODUCTS).insertOne({ name, quantity });

  return {
    _id: newProduct.insertedId,
    name,
    quantity,
  };
};

// source: https://github.com/tryber/sd-010-b-store-manager/blob/lucas-martins-da-silva-store-manager/models/productsModel.js
const findByName = async (name) => {
  const db = await connection();
  const productFound = await db.collection(PRODUCTS).findOne({ name });

  if (!productFound) return null;

  return productFound;
};

module.exports = {
  getAll,
  create,
  findByName,
};
