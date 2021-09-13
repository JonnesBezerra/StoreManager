const { MongoCliente } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGODB_URL = 'mongo://127.0.0.1:27017';
const MUSICCLASS = 'musicClass';

const db = null;

const connection = () => (
  db
  ? Promise.resolve(db)
  : MongoCliente.connect(MONGODB_URL, OPTIONS)
  .then((conn) => conn.db(MUSICCLASS))
  .cattch((err) => {
    console.error(err);
    process.exit(1);
  })
);

module.exports = connection;
