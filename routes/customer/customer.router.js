import express from 'express';
import { addCustomer, deleteCustomer, getAllCustomers, getCustomer, updateCustomer } from './controller/customer.controller.js';
import { errorHandler } from '../../middleware/handler.js';
const router = express.Router();

router.get('/',getAllCustomers);
router.get('/:id',getCustomer);
router.post('/',addCustomer);
router.delete('/:id',deleteCustomer);
router.put('/:id',updateCustomer);

router.use(errorHandler);
export default router;