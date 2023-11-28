import { Schema, model } from "mongoose";

const customerSchema = new Schema({
    name:{
        type:String,
        minlength:3,
        maxlength:15,
        trim:true,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
        validate:{
            validator:function(value){
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message:"Invalid email format. Please enter a valid email address."
        },
    },
    phone:{
        type:String,
        required:true,
        validate:{
            validator:function(value){
                return /^\d{10}$/.test(value); 
            },
            message: 'Phone must have exactly 10 digits',
        }
    },
    country:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{timestamps:true});

export const customerModel = model('Customer',customerSchema);