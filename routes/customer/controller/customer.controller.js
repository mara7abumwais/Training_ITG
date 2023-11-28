import { customerModel } from "../../../DB/models/customer.model.js";
import { handleError, handleResponse } from "../../../utils/handler.js";
import { validateCustomer } from "../../../utils/validateRequest.js";

export const getAllCustomers = async(req,res)=>{
    try{
        const customers = await customerModel.find();
        const response = { state: 'Success', message: customers };
        return handleResponse(res,200,response)
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
            return handleError(res,{message:'No customer with the given ID'});

        const response = { state: 'Success', message: customer };
        return handleResponse(res,200,response);
    }catch(err)
    {
        return handleError(res,err);
    }
};

export const addCustomer = async(req,res)=>{
    try{
        await validateCustomer(req.body);
        const customer = new customerModel(req.body);
        const result = await customer.save();
        const response = {state:'Success', message: result};
        return handleResponse(res,200,response);
    }
    catch (err) {
        return handleError(res,err);
    }
};

export const updateCustomer = async(req,res)=>{
    try{
        const {id} = req.params;
        await validateCustomer(req.body);
        const customer = await customerModel.findByIdAndUpdate({_id:id},req.body,{new:true});
        if(!customer)
            return handleError(res,{message:'No customer with the given ID' });
        const response = { state: 'Success', message: customer };
        return handleResponse(res,200,response);
    }catch (err) {
        return handleError(res,err);
    }
};

export const deleteCustomer = async(req,res)=>{
    try{
        const {id} = req.params;
        const customer = await customerModel.findByIdAndDelete(id);
        if(!customer)
            return handleError(res,{message:'No customer with the given ID' });
        const response = { state: 'Success', message: 'Customer successfully deleted' };
        return handleResponse(res,200,response);
    }
    catch(err)
    {
        return handleError(res,err);
    }
};
