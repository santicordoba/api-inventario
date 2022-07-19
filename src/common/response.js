const createError = require('http-errors');

module.exports.Response = {
    success: (res, status = 200, message = "OK", body = {}) => {
        res.status(status).json({
            message: message,
            body: body
        })
    },
    error: (res, error = null) => {
        // si no se especifica un error, se toma el error de InternalServerError
        const { statusCode, message } = error ? error : new createError.InternalServerError();
        res.status(statusCode).json({message});
    }
}