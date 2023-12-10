import { customerModel } from "../DB/models/customer.model.js";
import CustomError from "../utils/customError.js";
import { handleError, handleResponse } from "../middleware/handler.js";
import { customerSchema } from "../utils/validateCustomer.js";
import _ from 'lodash';

export const getAllCustomers = async(req,res)=>{
    const customers = await customerModel.find();
    return handleResponse(res,200,{ success: true,customers })
};

export const getCustomer = async(req,res)=>{
    const {id} = req.params;
    const customer = await customerModel.findById(id);
    if(!customer)
        throw new CustomError('Invalid Id','Invalid ID.',404);
    return handleResponse(res,200,{ success: true,customer });
};

export const addCustomer = async(req,res)=>{
    let customer = await customerSchema.validate(_.pick(req.body,
        ['name','email','phone','country','isActive'])|| {}, { abortEarly: false });
    customer = new customerModel(customer);
    await customer.save();
    return handleResponse(res,200,{success:true, customer});
};

export const updateCustomer = async(req,res)=>{ 
    const {id} = req.params;
    let customer = await customerSchema.validate(_.pick(req.body,['name','email','phone','country','isActive'])|| {}, { abortEarly: false });
    customer = await customerModel.findByIdAndUpdate({_id:id},customer,{new:true});
    if(!customer) throw new CustomError('Invalid Id','Invalid ID.',404);
    return handleResponse(res,200,{ success: true, customer });
};

export const deleteCustomer = async(req,res)=>{
    const {id} = req.params;
    const customer = await customerModel.findByIdAndDelete(id);
    if(!customer) throw new CustomError('Invalid Id','Invalid ID.',404);
    return handleResponse(res,200,{ success: true,id});
};
