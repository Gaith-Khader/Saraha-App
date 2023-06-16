import Jwt from "jsonwebtoken";

export const generateToken = (payload, signature = process.env.TOKEN_SIGNATURE, expiresIn='1h')=>{
    const token = Jwt.sign(payload, signature, {expiresIn});
    return token;
}

export const verifyToken = (token, signature = process.env.TOKEN_SIGNATURE)=>{
    const decoded = Jwt.verify(token, signature);
    return decoded;
}