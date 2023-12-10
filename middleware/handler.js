import { ValidationError } from 'yup';
import CustomError from '../utils/customError.js';

export const handleResponse = (res,statusCode, data) => {
    return res.status(statusCode).json(data);
};

export const handleError = (err,req,res,next) => {
    let statusCode = 500;
    let errors = [];
    if (err instanceof CustomError) {
        errors.push({ message: err.message });
        statusCode = err.statusCode;
    }else if (err instanceof ValidationError) {
        errors = err.inner.map((error) => ({ message: error.errors[0] }));
        statusCode = 400;
    } else if (err.name === 'ValidationError') {
        errors = Object.keys(err.errors).map((field) => ({
            message: err.errors[field].message,}));
        statusCode = 400;
    }
    else errors.push({ message: 'Something wrong.' });
    return handleResponse(res, statusCode, { success: false, errors });
};
