import mongoose from "mongoose";
import CustomError from "../utils/customError.js";

export const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(new CustomError('Cast error', 'Invalid ID.', 404)); 
    }
    next();
};
