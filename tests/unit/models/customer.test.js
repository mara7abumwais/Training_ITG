import { Types } from "mongoose";
import { customerModel } from "../../../DB/models/customer.model.js";
import jwt from 'jsonwebtoken';

describe('user.generateAuthToken',()=>{
    it('should return a valid JWT',()=>{
        const payload = {
            _id: new Types.ObjectId().toString()
        };
        const token = new customerModel(payload).generateAuthToken();
        const decoded = jwt.verify(token,process.env.CRUD_jwtPrivateKey);
        expect(decoded).toMatchObject(payload);
    });
})