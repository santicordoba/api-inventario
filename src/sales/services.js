const {ObjectId} = require('mongodb')

const { Database } = require('../database/index');

const { SalesUtils } = require('./utils');

const getAll = async () => {
    const collection = await Database('sales');
    return await collection.find({}).toArray();
}

const getById = async (id) => {
    const collection = await Database('sales');
    return await collection.findOne({ _id: ObjectId(id) });
}

const create = async (product) => {
    const collection = await Database('sales');
    let result = await collection.insertOne(product);
    return result.insertedId;
}

const generateReport = async (name, res) => {
    let products = await getAll();
    SalesUtils.excelGenerator(products, name, res);
}


module.exports.SalesService = {getAll, getById, create, generateReport};