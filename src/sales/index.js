const express = require('express');

const { SalesControllers } = require('./controller');

const router = express.Router();

module.exports.SalesAPI = (app) => {
    router
    .get('/', SalesControllers.getAllSales)
    .get('/report', SalesControllers.generateReport)
    .get('/:id', SalesControllers.getSaleById)
    .post('/', SalesControllers.createSale)

    app.use('/api/sales', router);
;}