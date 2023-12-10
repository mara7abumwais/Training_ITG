import { handleError } from "./handler.js";

export const asyncMiddleware = (handler)=>{
    return async(req,res,next)=>{
        try{
            await handler(req,res);
        }catch(err){
            handleError(err,req,res,next);
        }
    }
};