import express from 'express';
import { connectDB } from './DB/connection.js';
import index from './routes/index.router.js';
import customer from './routes/customer/customer.router.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const createApp = () => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use('/', index);
    app.use('/api/customer', customer);
    app.use('*', (req, res) => {
        res.status(404).json('Page not found');
    });
    return app;
};

const app = createApp();

connectDB();
const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`Listening at port ${port}...`));

