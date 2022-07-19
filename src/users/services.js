const {ObjectId} = require('mongodb')

const { Database } = require('../database/index');



const getAll = async () => {
    const collection = await Database('users');
    return await collection.find({}).toArray();
}

const getById = async (id) => {
    const collection = await Database('users');
    return await collection.findOne({ _id: ObjectId(id) });
}

const create = async (product) => {
    const collection = await Database('users');
    let result = await collection.insertOne(product);
    return result.insertedId;
}


const update = async (product, id) => {
    const collection = await Database('users');
    console.log(`services: ${id}`);
    let result = await collection.updateOne(
        { _id: ObjectId(id) },
        { $set: product }
    )
    return result.modifiedCount;
}

const deleteById = async (id) => {
    const collection = await Database('users');
    let result = await collection.deleteOne({ _id: ObjectId(id) });
    return result.deletedCount;
}


module.exports.UsersService = {getAll, getById, create, update, deleteById};