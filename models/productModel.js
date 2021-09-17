const { ObjectId } = require('mongodb');
const connection = require('./connection');

const PRODUCTS = 'products';

const getAll = async () => {
  try {
    const db = await connection();
    const allProducts = await db.collection(PRODUCTS).find({}).toArray();
    return allProducts;
  } catch (error) {
    console.error(error);
  }
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

const getByID = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const productFound = await db.collection(PRODUCTS).findOne({ _id: ObjectId(id) });

  if (!productFound) return null;

  return productFound;
};

const update = async ({ id, name, quantity }) => {
  const productID = new ObjectId(id);
  const productData = { name, quantity };

  const db = await connection();
  try {
    await db.collection(PRODUCTS).updateOne({ _id: productID }, { $set: productData });
    return {
      _id: productID,
      name,
      quantity,
    };
  } catch (error) {
    console.error(error);
  }
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const productID = new ObjectId(id);

  const db = await connection();
  const productDeleted = await db.collection(PRODUCTS).findOneAndDelete({ _id: productID });

  if (!productDeleted) return null;

  const { value } = productDeleted;
  
  return value;
};

// filterByOperation and updateQuantity inspired by: https://github.com/tryber/sd-010-b-store-manager/blob/093c003363d3745e7d4e81b8622fd6e37bc1d3d1/models/productsModel.js#L89
const filterByOperation = (operation, productID, quantity) => {
  switch (operation) {
    case 'decrease':
      return {
        $and: [
          { _id: ObjectId(productID) },
          { $expr: { $lt: [quantity, '$quantity'] } },
        ],
      };
    default:
      return { $and: [{ _id: ObjectId(productID) }] };
  }
};

const updateQuantity = async (operation, itensSold) => {
  if (operation !== 'decrease' && operation !== 'increase') {
    return null;
  }

  const db = await connection();

  const updateForEachProduct = itensSold.map(({ productId, quantity }) => {
    const whatToDo = (operation === 'decrease') ? { quantity: -quantity } : { quantity };

    return db.collection(PRODUCTS).findOneAndUpdate(
      filterByOperation(operation, productId, quantity),
      { $inc: whatToDo },
      { returnDocument: 'after' },
    );
  });

  const promiseResult = await Promise.all(updateForEachProduct);
  return promiseResult.every(({ value }) => value);
};

module.exports = {
  getAll,
  create,
  findByName,
  getByID,
  update,
  deleteProduct,
  updateQuantity,
};
