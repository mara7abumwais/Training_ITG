import { customerModel } from "../../../DB/models/customer.model.js";
import { validateCustomer } from "../../../middleware/validateRequest.js";

export const getAllCustomers = async(req,res,next)=>{
    try{
        const customers = await customerModel.find();
        res.status(200).json({ state: 'Success', message: customers });
    }catch(err)
    {
        next(err);
    }
};

export const getCustomer = async(req,res,next)=>{
    try{
        const {id} = req.params;
        const customer = await customerModel.findById(id);
        if(!customer)
            return next({message:'No customer with the given ID'});
        res.status(200).json({ state: 'Success', message: customer });
    }catch(err)
    {
        return next(err);
    }
};

export const addCustomer = async(req,res,next)=>{
    try{
        await validateCustomer(req.body);
        const customer = new customerModel(req.body);
        const result = await customer.save();
        res.status(201).json({state:'Success', message: result});
    }
    catch (err) {
        next(err);
    }
};

export const updateCustomer = async(req,res,next)=>{
    try{
        const {id} = req.params;
        await validateCustomer(req.body);
        const {name,phone,email,isActive,country} = req.body;
        const customer = await customerModel.findById(id);
        if(!customer)
            return next({message:'No customer with the given ID' });
        
        const result = await customerModel.findByIdAndUpdate({_id:id},{
            name,phone,email,isActive,country
        },{new:true});
        res.status(200).json({ state: 'Success', message: result });
    }catch (err) {
        next(err);
    }
};

export const deleteCustomer = async(req,res,next)=>{
    try{
        const {id} = req.params;
        const customer = await customerModel.findById(id);
        if(!customer)
            return next({message:'No customer with the given ID' });
        const result = await customerModel.findByIdAndDelete(id);
        res.status(200).json({ state: 'Success', message: 'Customer successfully deleted' });
    }
    catch(err)
    {
        next(err);
    }
};