const express = require('express');
const bodyParser = require('body-parser');
const productRouter = require('./routes/productRouter');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());

app.use('/products', productRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Pai tá on na porta ${PORT}`));
