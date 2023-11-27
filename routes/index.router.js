import express from 'express';
const router = express.Router();

router.get('/',(req,res)=>{
    const resObject = {
        state:'success',
        message: 'Hello World!',
    };
    res.status(200).json(resObject);
});

export default router;