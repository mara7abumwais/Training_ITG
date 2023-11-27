import {ValidationError} from 'yup';

export const errorHandler = (error, req, res, next) => {
    if (error.name === 'CastError') 
    {
        return res.status(400).json({ state: 'Failed', errors:[{message:'Invalid ID format'}]});
    }
    else if (error instanceof ValidationError) {
        const validationErrors = error.inner.map((error) => ({
            message: error.errors[0],
        }));
        return res.status(400).json({ state: 'Failed', errors: validationErrors });
    }else if (error.name === 'ValidationError') {
        const validationErrors = Object.keys(error.errors).map((field) => ({
            message: error.errors[field].message,
        }));
        return res.status(400).json({ state: 'Failed', errors: validationErrors });
    }
    res.status(400).json({ state: 'Failed', errors:[{message:error.message }]});
};


