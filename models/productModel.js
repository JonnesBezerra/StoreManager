const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const allSongs = await db.collection('songs').find().toArray();
  return allSongs;
};

const create = async ({ name, album }) => {
  const db = await connection();
  const newSong = await db.collection('songs').insertOne({ name, album });
  return { id: newSong.insertedId, name, album };
};

module.exports = {
  getAll,
  create,
};
