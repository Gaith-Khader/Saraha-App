import userModel from '../../../../DB/model/user.model.js'
import { generateToken, verifyToken } from '../../../Services/GenerateAndVerify.js';
import { compare, hash } from '../../../Services/HashAndCompare.js';
import { sendEmail } from '../../../Services/sendEmail.js'

export const signup = async (req,res)=>{
    const {userName,email,password} = req.body;
    const user = await userModel.findOne({email});
    // check if email is exists
    if(user){
        return res.status(404).json({message:"email already exists"})
    }
    // if the email is new then => hash password and then create a new user
    const hashPassword=hash(password);

    const token = generateToken({email}, process.env.VERIFYTOKEN);
    const link = `http://localhost:3000/auth/confirmEmail/${token}`;
    await sendEmail(email,'confirm Email', `<a href="${link}">plz cnfirm emial</a>`);
    
    const createUser = await userModel.create({userName,email,password:hashPassword});
    return res.status(201).json({message:"success",user:createUser});
}

export const login = async (req,res) => {

    const {email,password} = req.body;
    const user = await userModel.findOne({email});
    // check if email is exists
    if(!user){
        return res.status(404).json({message:"user not found"});
    }
    if(!user.confirmEmail){
        return res.json({message:'plz verify your email'})
    }
    // if it is exsits then => compare password and log in
    const match = compare(password,user.password);
    if(!match){
        return res.json({message:"password mismatch"});
    }
    // create token 
    const token = generateToken({id:user._id});
    return res.status(200).json({message:"success",user,token});
}

export const confirmEmail = async (req,res) => {
    const {token} = req.params;
    const decoded = verifyToken(token,process.env.VERIFYTOKEN);
    const user = await userModel.updateOne({email:decoded.email},{confirmEmail:true});
    return res.json({message:"your email is now confirmed"})
}