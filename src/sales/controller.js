const { SalesService } = require('./services');
const { ProductsService } = require('../products/services');
const debug = require('debug')('app:module-sales-controller');
const { Response } = require('../common/response');
const createError = require('http-errors');


module.exports.SalesControllers = {
    getAllSales: async (req, res) => {
        try{
            let sales = await SalesService.getAll();
            Response.success(res, 200, "Lista de ventas", sales);
        }catch(e){
            debug(e);
            Response.error(res);
        }
    },
    getSaleById: async (req, res) => {
        try{
            let id = req.params.id;
            let sale = await SalesService.getById(id);
            if(!sale){
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, `Venta ${id}`, sale);
            }
        } catch(e){
            debug(e);
            Response.error(res);
        }
    },
    createSale: async (req, res) => {
        try{
            let { body } = req;
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest());
            } else {
                let product = await ProductsService.getById(body.productId);
                if(product.cantidad >= body.cantidad){
                    let id = await SalesService.create(body);
                    Response.success(res, 201, `Venta creada`, {id});
                    product = {...product, cantidad: product.cantidad - body.cantidad};
                    ProductsService.update(product, body.productId);
                } else {
                    Response.error(res, 400, `No hay suficientes productos`);
                }      
            }
        }catch(e){
            debug(e);
            Response.error(res);
        }
    },
    generateReport: async (req, res) => {
        try{
            SalesService.generateReport('Ventas', res);
        } catch(e){
            debug(e);
            Response.error(res);
        }
    }

}