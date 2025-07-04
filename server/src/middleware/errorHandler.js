const errorHandler = (err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
   
    res.status(errorStatus).json({
        success:false,
        statusCode : errorStatus,
        message : errorMessage,
        // stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = errorHandler;
