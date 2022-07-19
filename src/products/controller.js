const { ProductsService } = require('./services');
const debug = require('debug')('app:module-products-controller');
const { Response } = require('../common/response');
const createError = require('http-errors');

module.exports.ProductsControllers = {
    getAllProducts: async (req, res) => {
        try{
            let products = await ProductsService.getAll();
            Response.success(res, 200, "Lista de productos", products);
        }catch(e){
            debug(e);
            Response.error(res);
        }
    },
    getProductById: async (req, res) => {
        try{
            let id = req.params.id;
            let product = await ProductsService.getById(id);
            if(!product){
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, `Producto ${id}`, product);
            }
        } catch(e){
            debug(e);
            Response.error(res);
        }
    },
    createProduct: async (req, res) => {
        try{
            let { body } = req;
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest());
            } else {
                let id = await ProductsService.create(body);
                Response.success(res, 201, `Producto creado`, {id});
            }
        }catch(e){
            debug(e);
            Response.error(res);
        }
    },
    updateProduct: async (req, res) => {
        try{
            let { body } = req;
            let { id } = req.params;
            console.log(`controller: ${id}`);
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest());
            } else {
                await ProductsService.update(body, id);
                Response.success(res, 200, `Producto actualizado`, {id});
            }
        }catch(e){
            debug(e);
            Response.error(res);
        }
    },
    deleteProduct: async (req, res) => {
        try{
            let { id } = req.params;
            let result = await ProductsService.deleteById(id);
            if(result === 0){
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, `Producto ${id} eliminado`);
            }
        }catch(e){
            debug(e);
            Response.error(res);
        }
    },
    generateReport: async (req, res) => {
        try{
            ProductsService.generateReport('Inventario', res);
        } catch(e){
            debug(e);
            Response.error(res);
        }
    }

}