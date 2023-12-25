import { customerModel } from "../DB/models/customer.model.js";
import CustomError from "../utils/customError.js";
import { handleResponse } from "../middleware/handler.js";
import _ from 'lodash';

export const getAllCustomers = async(req,res)=>{
    const customers = await customerModel.find();
    return handleResponse(res,200,{ success: true,customers })
};

export const getCustomer = async(req,res)=>{
    const {id} = req.params;
    const customer = await customerModel.findById(id);
    if(!customer)
        throw new CustomError('Invalid ID',404);
    return handleResponse(res,200,{ success: true,customer });
};

export const addCustomer = async(req,res)=>{
    let customer = await customerModel.findOne({email:req.body.email});
    if(customer) throw new CustomError('The user is already registered.',400);

    customer = new customerModel(_.pick(req.body,['name','email','phone','country','isActive']));
    await customer.save();

    const token = customer.generateAuthToken();
    return handleResponse(res,200,{success:true, customer},token);
};

export const updateCustomer = async(req,res)=>{ 
    const {id} = req.params;

    const customer = await customerModel.findByIdAndUpdate({_id:id},
        _.pick(req.body,['name','email','phone','country','isActive']),{new:true});
    
    if(!customer) throw new CustomError('Invalid ID',404);
    return handleResponse(res,200,{ success: true, customer });
};

export const deleteCustomer = async(req,res)=>{
    const {id} = req.params;
    const customer = await customerModel.findByIdAndDelete(id);
    if(!customer) throw new CustomError('Invalid ID',404);
    return handleResponse(res,200,{ success: true,id});
};
