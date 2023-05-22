import { asyncError, errorHandeler } from "../../../middleware/error";
import { connectDB, cookieSetter, generateToken } from "../../../utils/features";
import {User} from "../../../models/user.js";
import bcrypt from "bcrypt";

const handler=asyncError(async(req,res)=>{
    if(req.method!=="POST"){
        return errorHandeler(res,400,"only post method is allowed");
    }
    const {email,password} = req.body;
    if(!email || !password){
        return errorHandeler(res,400,"Every field is required");
    }
    await connectDB();
    let user = await User.findOne({email}).select("+password");
    if(!user){
        return errorHandeler(res,400,"Enter valid email id or password");
    }
    const isMatching = await bcrypt.compare(password,user.password);
    if(!isMatching){
        return errorHandeler(res,400,"Enter valid email id or password");
    }
    const token=generateToken(user._id);
    cookieSetter(res,token,true);

    res.status(202).json({
        success:true,
        message:`welcome back ${user.name}`,
        user,
    })
});

export default handler;