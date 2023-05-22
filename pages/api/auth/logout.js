import { asyncError, errorHandeler } from "../../../middleware/error";
import { cookieSetter } from "../../../utils/features";

const handler=asyncError(async(req,res)=>{
    if(req.method!=="GET"){
        return errorHandeler(res,400,"only get method is allowed");
    }
    cookieSetter(res,null,false);

    res.status(202).json({
        success:true,
        message:"logout successfully"
    })
});

export default handler;