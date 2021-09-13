const { MongoCliente } = require('mongodb');

const MONGODB_URL = 'mongo://127.0.0.1:27017';
const MUSICCLASS = 'musicClass';

const connection = () =>
  MongoCliente.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => conn.db(MUSICCLASS))
  .cattch((err) => {
    console.error(err);
    process.exit(1);
  });

module.exports = connection;
