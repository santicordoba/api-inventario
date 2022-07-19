const express = require('express');

const { ProductsControllers } = require('./controller');

const router = express.Router();

module.exports.ProductsAPI = (app) => {
    router
    .get('/', ProductsControllers.getAllProducts)
    .get('/report', ProductsControllers.generateReport)
    .get('/:id', ProductsControllers.getProductById)
    .post('/', ProductsControllers.createProduct)
    .put('/:id', ProductsControllers.updateProduct)
    .delete('/:id', ProductsControllers.deleteProduct)

    app.use('/api/products', router);
;}