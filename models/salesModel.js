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

module.exports = {
  create,
  getAll,
};
