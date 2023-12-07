import { ValidationError } from 'yup';
import CustomError from './customError.js';

export const handleResponse = (res,statusCode, data) => {
    return res.status(statusCode).json(data);
};

export const handleError = (res,error) => {
    let statusCode = 500;
    let errors = [];
    if (error instanceof CustomError) {
        errors.push({ message: error.message });
        statusCode = error.statusCode;
    }else if (error.name === 'CastError') {
        errors.push({ message: 'Invalid ID format' });
        statusCode = 400;
    } else if (error instanceof ValidationError) {
        errors = error.inner.map((error) => ({ message: error.errors[0] }));
        statusCode = 400;
    } else if (error.name === 'ValidationError') {
        errors = Object.keys(error.errors).map((field) => ({
            message: error.errors[field].message,}));
        statusCode = 400;
    }
    else errors.push({ message: 'Something wrong.' });
    return handleResponse(res, statusCode, { success: false, errors });
};
