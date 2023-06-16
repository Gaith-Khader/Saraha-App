import bcrypt from 'bcryptjs';

export const hash=(plainText,saldRound=process.env.SALTROUND)=>{
    const hashResult = bcrypt.hashSync(plainText,parseInt(saldRound));
    return hashResult;
}

export const compare = (password,hashValue)=>{
    const hashResult = bcrypt.compareSync(password,hashValue);
    return hashResult;
}