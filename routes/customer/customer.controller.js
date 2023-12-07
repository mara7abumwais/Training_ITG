import { customerModel } from "../../DB/models/customer.model.js";
import CustomError from "../../utils/customError.js";
import { handleError, handleResponse } from "../../utils/handler.js";
import { validateCustomer } from "../../utils/validateRequest.js";

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
        let customer = await validateCustomer(req.body);
        customer = new customerModel(customer);
        const result = await customer.save();
        return handleResponse(res,200,{success:true, result});
    }
    catch (err) {
        return handleError(res,err);
    }
};

export const updateCustomer = async(req,res)=>{ 
    try{
        const {id} = req.params;
        await validateCustomer(req.body);//validate +id
        const customer = await customerModel.findByIdAndUpdate({_id:id},req.body,{new:true});
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
