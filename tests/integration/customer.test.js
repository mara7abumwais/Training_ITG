import {server} from '../../app.js';
import request from 'supertest';
import { customerModel } from '../../DB/models/customer.model.js';
import { Types } from 'mongoose';

describe('/api/cutomer',()=>{
    afterEach(async()=>{
        server.close();
        await customerModel.deleteMany({});
    });

    describe('GET / ',()=>{
        it('should retuen all customers',async()=>{
            await customerModel.collection.insertMany([
                {name:'marah1',email:"marah1@gmail.com",phone:"0599999999",country:"palestine"},
                {name:'marah2',email:"marah2@gmail.com",phone:"0599999999",country:"palestine"},
            ]);

            const res = await request(server).get('/api/customer');
            expect(res.status).toBe(200);
            expect(res.body.success).toBeTruthy();
            expect(res.body.customers.length).toBe(2);
            expect(res.body.customers.some((c) => c.name === 'marah1')).toBeTruthy();
        });
    });

    describe('GET /:id ',()=>{
        it('should retuen customer if valid id is passed',async()=>{
            const customer = new customerModel({name:'marah1',email:"marah1@gmail.com",phone:"0599999999",country:"palestine"});
            await customer.save();

            const res = await request(server).get(`/api/customer/${customer._id}`);
            expect(res.status).toBe(200);
            expect(res.body.success).toBeTruthy();
            expect(res.body.customer).toHaveProperty('name',customer.name); 
        });

        it('should retuen 404 if invalid id is passed',async()=>{
            const res = await request(server).get('/api/customer/1');
            expect(res.status).toBe(404);
            expect(res.body.success).not.toBeTruthy();
        });

        it('should retuen 404 if no customer with the passed id',async()=>{
            const customer = new customerModel({name:'marah1',email:"marah1@gmail.com",phone:"0599999999",country:"palestine"});
            await customer.save();
            
            const id = new Types.ObjectId();
            const res = await request(server).get('/api/customer/'+id);
            expect(res.status).toBe(404);
            expect(res.body.success).not.toBeTruthy();
        });
    });
});