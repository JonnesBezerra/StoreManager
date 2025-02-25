const express = require('express');
const bodyParser = require('body-parser');
const productRouter = require('./routes/productRouter');
const salesRouter = require('./routes/salesRouter');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => res.json({ message: 'Everything alright!' }));
app.use('/products', productRouter);
app.use('/sales', salesRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Pai tá on na porta ${PORT}`));
