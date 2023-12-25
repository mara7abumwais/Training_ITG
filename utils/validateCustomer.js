import { object, string ,boolean} from 'yup';

export const customerSchema = object({
    name:string().min(3).max(15).required('User name is required'),
    email:string().matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Invalid email format. Please enter a valid email address.").required('User email is required'),
    phone:string().length(10, 'Phone must be 10 numbers').required('User phone is required'),
    country:string().required('User country is required'),
    isActive:boolean(),
}).unknown();
