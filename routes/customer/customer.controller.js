import { customerModel } from "../../DB/models/customer.model.js";
import CustomError from "../../utils/customError.js";
import { handleError, handleResponse } from "../../utils/handler.js";
import { customerSchema } from "../../utils/validateRequest.js";
import _ from 'lodash';

export const getAllCustomers = async(req,res)=>{
    try{
        const customers = await customerModel.find();
        return handleResponse(res,200,{ success: true,customers })
    }catch(err)
    {
        return handleError(res,err);
    }
};

export const getCustomer = async(req,res)=>{
    try{
        const {id} = req.params;
        const customer = await customerModel.findById(id);
        if(!customer)
            throw new CustomError('Invalid Id','No customer with the given ID',404);
        return handleResponse(res,200,{ success: true,customer });
    }catch(err)
    {
        return handleError(res,err);
    }
};

export const addCustomer = async(req,res)=>{
    try{
        let customer = await customerSchema.validate(_.pick(req.body,['name','email','phone','country','isActive'])|| {}, { abortEarly: false });
        customer = new customerModel(customer);
        await customer.save();
        return handleResponse(res,200,{success:true, customer});
    }
    catch (err) {
        console.error('Error in addCustomer:', err);
        return handleError(res,err);
    }
};

export const updateCustomer = async(req,res)=>{ 
    try{
        const {id} = req.params;
        let customer = await customerSchema.validate(_.pick(req.body,['name','email','phone','country','isActive'])|| {}, { abortEarly: false });
        customer = await customerModel.findByIdAndUpdate({_id:id},customer,{new:true});
        if(!customer) throw new CustomError('Invalid Id','No customer with the given ID',404);
        return handleResponse(res,200,{ success: true, customer });
    }catch (err) {
        return handleError(res,err);
    }
};

export const deleteCustomer = async(req,res)=>{
    try{
        const {id} = req.params;
        const customer = await customerModel.findByIdAndDelete(id);
        if(!customer) throw new CustomError('Invalid Id','No customer with the given ID',404);
        return handleResponse(res,200,{ success: true,id});
    }
    catch(err)
    {
        return handleError(res,err);
    }
};
