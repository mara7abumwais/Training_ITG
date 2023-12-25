import express from 'express';
import { addCustomer, deleteCustomer, getAllCustomers, getCustomer, updateCustomer } from '../controllers/customer.controller.js';
import { asyncMiddleware } from '../middleware/async.js';
import { validateObjectId } from '../middleware/validateObjectId.js';
import {validate} from '../middleware/validate.js';
import { customerSchema } from "../utils/validateCustomer.js";
const router = express.Router();

router.get('/',asyncMiddleware(getAllCustomers));
router.get('/:id',validateObjectId,asyncMiddleware(getCustomer));
router.post('/',validate(customerSchema),asyncMiddleware(addCustomer));
router.delete('/:id',validateObjectId,asyncMiddleware(deleteCustomer));
router.put('/:id',[validateObjectId,validate(customerSchema)],asyncMiddleware(updateCustomer));

export default router;