const {ObjectId} = require('mongodb')

const { Database } = require('../database/index');

const { ProductsUtils } = require('./utils');

const getAll = async () => {
    const collection = await Database('products');
    return await collection.find({}).toArray();
}

const getById = async (id) => {
    const collection = await Database('products');
    return await collection.findOne({ _id: ObjectId(id) });
}

const create = async (product) => {
    const collection = await Database('products');
    let result = await collection.insertOne(product);
    return result.insertedId;
}

const generateReport = async (name, res) => {
    let products = await getAll();
    ProductsUtils.excelGenerator(products, name, res);
}

const update = async (product, id) => {
    const collection = await Database('products');
    let result = await collection.updateOne(
        { _id: ObjectId(id) },
        { $set: product }
    )
    return result.modifiedCount;
}

const deleteById = async (id) => {
    const collection = await Database('products');
    let result = await collection.deleteOne({ _id: ObjectId(id) });
    return result.deletedCount;
}


module.exports.ProductsService = {getAll, getById, create, generateReport, update, deleteById};