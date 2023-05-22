import { asyncError, errorHandeler } from "../../../middleware/error";
import { connectDB, cookieSetter, generateToken } from "../../../utils/features";
import {User} from "../../../models/user.js";
import bcrypt from "bcrypt";

const handler=asyncError(async(req,res)=>{
    if(req.method!=="POST"){
        return errorHandeler(res,400,"only post method is allowed");
    }
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        return errorHandeler(res,400,"Every field is required");
    }
    await connectDB();
    let user = await User.findOne({email});
    if(user){
        return errorHandeler(res,400,"user already registered with this email");
    }
    const hashedPassword = await bcrypt.hash(password,10);
    user=await User.create({
        name,
        email,
        password:hashedPassword,
    });
    const token=generateToken(user._id);
    cookieSetter(res,token,true);

    res.status(202).json({
        success:true,
        message:"user registered successfully",
        user,
    })
});

export default handler;