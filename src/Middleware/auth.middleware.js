import { verifyToken } from "../Services/GenerateAndVerify.js";
import userModel from '../../DB/model/user.model.js'

export const auth = async (req,res,next)=>{
    // get authentication form the headers
    const {authorization} = req.headers;
    // check if authorization available and sent with bearer token
    if(!authorization?.startsWith(process.env.BEARER_TOKEN)){
        return res.json({message:'invalid bearer token'})
    }
    // now i have token and i want to decoed it 
    const token = authorization.split(process.env.BEARER_TOKEN)[1];
    if(!token){
        return res.json({message:'invalid token'})
    }
    const decoded = verifyToken(token);
    const authUser = await userModel.findById(decoded.id);
    if(!authUser){
        return res.status(401).json({message:'id not found'})
    }
    req.id=decoded.id;
    next();
}