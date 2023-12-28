import { customerModel} from "../../../DB/models/customer.model.js";
import {auth} from '../../../middleware/auth.js';
import jest from 'jest-mock';
import { Types } from "mongoose";


describe('auth middleware',()=>{
    it('should populate req.customer with the payload of a valid JWT',()=>{
        const payload = {_id: new Types.ObjectId().toString()};
        const token = new customerModel(payload).generateAuthToken();
        const req = {
            header: jest.fn().mockReturnValue(token)
        };
        const res = {};
        const next = jest.fn();
        auth(req,res,next);
        expect(req.customer).toMatchObject(payload);
    });
});