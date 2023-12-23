const {constants} = require('../constants');

const errorHandler = (err , req , res , next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500 ; 
    
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.status(statusCode).json({ title : "Validation failed" ,message : err.message , stackTrace : err.stack});
            break;
        case constants.UNAUTHORIZED:
            res.status(statusCode).json({ title : "unauthorized" ,message : err.message , stackTrace : err.stack});
            break;
        case constants.FORBIDDEN:
            res.status(statusCode).json({ title : "Forbidden" ,message : err.message , stackTrace : err.stack});
            break;
        case constants.NOT_FOUND:
            res.status(statusCode).json({ title : "Not found" ,message : err.message , stackTrace : err.stack});
            break;
        case constants.SERVER_ERROR:
            res.status(statusCode).json({ title : "server error" ,message : err.message , stackTrace : err.stack});
            break;
    
        default:
            res.status(statusCode).json(`unknown error with statusCode :${statusCode} `  );
            break;
    }
};


module.exports = errorHandler;