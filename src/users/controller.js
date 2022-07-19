const { UsersService } = require('./services');
const debug = require('debug')('app:module-users-controller');
const { Response } = require('../common/response');
const createError = require('http-errors');

module.exports.UsersControllers = {
    getAllUsers: async (req, res) => {
        try{
            let users = await UsersService.getAll();
            Response.success(res, 200, "Lista de usuarios", users);
        }catch(e){
            debug(e);
            Response.error(res);
        }
    },
    getUserById: async (req, res) => {
        try{
            let id = req.params.id;
            let user = await UsersService.getById(id);
            if(!user){
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, `Usuario ${id}`, user);
            }
        } catch(e){
            debug(e);
            Response.error(res);
        }
    },
    createUser: async (req, res) => {
        try{
            let { body } = req;
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest());
            } else {
                let id = await UsersService.create(body);
                Response.success(res, 201, `Usuario creado`, {id});
            }
        }catch(e){
            debug(e);
            Response.error(res);
        }
    },
    updateUser: async (req, res) => {
        try{
            let { body } = req;
            let { id } = req.params;
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest());
            } else {
                await UsersService.update(body, id);
                Response.success(res, 200, `Usuario actualizado`, {id});
            }
        }catch(e){
            debug(e);
            Response.error(res);
        }
    },
    deleteUser: async (req, res) => {
        try{
            let { id } = req.params;
            let result = await UsersService.deleteById(id);
            if(result === 0){
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, `Usuario ${id} eliminado`);
            }
        }catch(e){
            debug(e);
            Response.error(res);
        }
    }
}