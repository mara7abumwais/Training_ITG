import { ValidationError } from 'yup';
import CustomError from '../utils/customError.js';

export const handleResponse = (res,statusCode, data,token=null) => {
    if(!token) return res.status(statusCode).json(data);
    return res.header('x-auth-token',token).status(statusCode).json(data);
};

export const handleError = (err,req,res,next) => {
    let statusCode = 500;
    let errors = [];
    if (err instanceof CustomError) {
        errors.push(err.message );
        statusCode = err.statusCode;
    }else if (err instanceof ValidationError) {
        errors = err.inner.map((error) => (error.errors[0]));
        statusCode = 400;
    } else if (err.name === 'ValidationError') {
        errors = Object.keys(err.errors).map((field) => (err.errors[field].message));
        statusCode = 400;
    }
    else errors.push('Something went wrong!');
    return handleResponse(res, statusCode, { success: false,errors });
};
