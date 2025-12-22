
const errorHandler = (err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.isOperational
        ? err.message
        : 'Internal Server Error';

    if(process.env.NODE_ENV !== 'production'){
        console.log(error);
    }

    res.status(statusCode).json({
        success: false,
        message,
    });
};

export default errorHandler;