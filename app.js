import dotenv from 'dotenv';
import { connectDB } from './DB/connection.js';
import { createApp } from './utils/createApp.js';
dotenv.config();

const app = createApp();
connectDB();

const port = process.env.PORT || 3000;
export const server = app.listen(port,()=>console.log(`Listening at port ${port}...`));

