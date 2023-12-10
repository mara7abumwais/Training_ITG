import index from '../routes/index.router.js';
import customer from '../routes/customer.router.js';
import express from 'express';
import cors from 'cors';
import { handleError } from '../middleware/handler.js';

export const createApp = () => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use('/', index);
    app.use('/api/customer', customer);
    app.use('*', (req, res) => {
        res.status(404).json('Page not found');
    });
    app.use(handleError);
    return app;
};