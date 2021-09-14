const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Local DB
const MONGODB_URL = 'mongodb://localhost:27017/StoreManager';
const DB_NAME = 'StoreManager';

// Avaliator DB
// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
// const DB_NAME = 'StoreManager';

let db = null;

const connection = () => (
  db
  ? Promise.resolve(db)
  : MongoClient.connect(MONGODB_URL, OPTIONS)
  .then((conn) => {
    db = conn.db(DB_NAME);
    return db;
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
);

module.exports = connection;
