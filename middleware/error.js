export const errorHandeler=(res,status,message)=>{
    return res.status(status).json({
        success:false,
        message,
    })
}

export const asyncError=(passedFunction)=>(req,res)=>{
    return Promise.resolve(passedFunction(req,res)).catch((err)=>{
        return errorHandeler(res,500,err.message);
    })
}