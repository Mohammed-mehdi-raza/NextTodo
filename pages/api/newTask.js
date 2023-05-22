import { asyncError, errorHandeler } from "../../middleware/error.js";
import { Task } from "../../models/task.js";
import {checkAuth, connectDB} from "../../utils/features.js";

const handler=asyncError(async(req,res)=>{
    if(req.method!=="POST"){
        return errorHandeler(res,400,"only post method is allowed");
    }
    await connectDB();
    const {title,description}=req.body;
    if(!title || !description){
        return errorHandeler(res,400,"Enter all fields");
    }

    const user = await checkAuth(req);

    if(!user){
        return errorHandeler(res,400,"Login First");
    }

    await Task.create({
        title,
        description,
        user:user._id,
    })
    res.json({
        success:true,
        message:"task added successfully",
    })
});

export default handler;