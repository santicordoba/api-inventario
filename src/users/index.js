const express = require('express');

const { UsersControllers } = require('./controller');

const router = express.Router();

module.exports.UsersAPI = (app) => {
    router
    .get('/', UsersControllers.getAllUsers)
    .get('/:id', UsersControllers.getUserById)
    .post('/', UsersControllers.createUser)
    .put('/:id', UsersControllers.updateUser)
    .delete('/:id', UsersControllers.deleteUser)

    app.use('/api/users', router);
;}