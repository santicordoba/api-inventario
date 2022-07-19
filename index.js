const express = require('express');
const debug = require('debug')('app:main');

const { ProductsAPI } = require('./src/products/index');
const { UsersAPI } = require('./src/users/index');
const { SalesAPI } = require('./src/sales/index');

const app = express();

app.use(express.json());

ProductsAPI(app);
UsersAPI(app);
SalesAPI(app);

const { Config } = require('./src/config/index');


app.listen(Config.port, () => {
    debug(`Servidor escuchando en el puerto ${Config.port}`);
})