import * as yup from 'yup';

export const validateCustomer = async(customer) =>{
    const customerSchema = yup.object().shape({
        name:yup.string().min(3).max(15).required(),
        email:yup.string().email().required(),
        phone:yup.string().length(10).required(),
        country:yup.string().required(),
        isActive:yup.boolean(),
    });

    const result = await customerSchema.validate(customer,{abortEarly:false});
};
