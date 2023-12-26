import CustomError from "../utils/customError.js";
import jwt from 'jsonwebtoken';

export const auth =(req,res,next)=>{
    try{
        const token = req.header('x-auth-token');
        if(!token) throw new CustomError('Access denied. No token provided.',401);
        const decoded = jwt.verify(token,process.env.CRUD_jwtPrivateKey);
        req.user = decoded;
        next();
    }catch(err)
    {
        next(err);
    }
};