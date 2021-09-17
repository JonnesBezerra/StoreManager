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

module.exports = {
  create,
};
