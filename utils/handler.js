import { ValidationError } from 'yup';

export const handleResponse = (res,statusCode, data) => {
    return res.status(statusCode).json(data);
};

export const handleError = (res,error) => {
    const statusCode = 400;
    let errors = [];

    if (error.name === 'CastError') {
        errors.push({ message: 'Invalid ID format' });
    } else if (error instanceof ValidationError) {
        errors = error.inner.map((error) => ({ message: error.errors[0] }));
    } else if (error.name === 'ValidationError') {
        errors = Object.keys(error.errors).map((field) => ({
            message: error.errors[field].message,
        }));
    } else {
        errors.push({ message: error.message });
    }

    return handleResponse(res, statusCode, { success: false, errors });
};
