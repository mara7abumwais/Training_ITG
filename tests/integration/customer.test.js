import {server} from '../../app.js';
import request from 'supertest';
import { customerModel } from '../../DB/models/customer.model.js';

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

    
});