import { asyncError, errorHandeler } from "../../../middleware/error";
import { Task } from "../../../models/task";
import { checkAuth, connectDB } from "../../../utils/features";

const handler = asyncError(async(req,res)=>{
    await connectDB();

    const user= await checkAuth(req);

    if(!user){
        return errorHandeler(res,400,"Login first");
    }

    const taskId=req.query.id;

    const task=await Task.findById(taskId);

    if(!task){
        return errorHandeler(res,400,"task not found");
    }

    if(req.method==="PUT"){
        task.isCompleted=!task.isCompleted;
        
        await task.save();

        res.status(200).json({
            success:true,
            message:"task updated successfully",
        })

    }else if(req.method==="DELETE"){
        await task.deleteOne();

        res.status(200).json({
            success:true,
            message:"task deleted succesfully",
        })

    }else{
        return errorHandeler(res,400,"only put and delete is allowed");
    }
})

export default handler;