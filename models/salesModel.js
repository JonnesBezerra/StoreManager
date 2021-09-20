const { ObjectId } = require('mongodb');
const connection = require('./connection');

const SALES = 'sales';

const create = async (itensSold) => {
  const db = await connection();
  const { insertedId } = await db.collection(SALES).insertOne({ itensSold });

  return {
    _id: insertedId,
    itensSold,
  };
};

const getAll = async () => {
  try {
    const db = await connection();
    const allSales = await db.collection(SALES).find({}).toArray();
    return { sales: allSales };
  } catch (error) {
    console.error(error);
  }
};

const getByID = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const saleFound = db.collection(SALES).findOne({ _id: ObjectId(id) });

  if (!saleFound) return null;
  
  return saleFound;
};

const update = async ({ id, itensSold }) => {
  const saleID = new ObjectId(id);

  const db = await connection();
  try {
    const { value } = await db.collection(SALES)
      .findOneAndUpdate({ _id: saleID }, { $set: { itensSold } }, { returnDocument: 'after' });
    
    return value;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  create,
  getAll,
  getByID,
  update,
};
