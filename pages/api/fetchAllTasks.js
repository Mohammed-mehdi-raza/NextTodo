import { asyncError, errorHandeler } from "../../middleware/error.js";
import { Task } from "../../models/task.js";
import {checkAuth, connectDB} from "../../utils/features.js";

const handler=asyncError(async(req,res)=>{
    if(req.method!=="GET"){
        return errorHandeler(res,400,"only get method is allowed");
    }
    await connectDB();
    const user = await checkAuth(req);
    if(!user){
        return errorHandeler(res,400,"Login first");
    }
    const tasks= await Task.find({user:user._id});
    res.json({
        success:true,
        tasks,
    })
});

export default handler;