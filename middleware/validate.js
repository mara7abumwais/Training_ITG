export const validate = (validator) =>{
    return async (req,res,next) => {
        try{
            await validator.validate(req.body, { abortEarly: false });
            next();
        }catch(err){
            next(err);
        }
    }
};



