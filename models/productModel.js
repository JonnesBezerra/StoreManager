const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const allProducts = await db.collection('products').find().toArray();
  return allProducts;
};

const create = async ({ name, quantity }) => {
  const db = await connection();
  const newProduct = await db.collection('products').insertOne({ name, quantity });

  return {
    _id: newProduct.insertedId,
    name,
    quantity,
  };
};

module.exports = {
  getAll,
  create,
};
