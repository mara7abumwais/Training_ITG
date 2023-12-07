export default class CustomError extends Error{
    constructor(name,message,statusCode)
    {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
    }
}