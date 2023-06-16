const dataMethods =['body','query','params'];
const validation = (schema)=>{

    return (req,res,next)=>{
        const errorArray= [];
        dataMethods.forEach(method=>{
            if (schema[method]){
                const validationResault= schema[method].validate(req[method],{abortEarly:false});
                if (validationResault.error){
                    errorArray.push(validationResault.error.details);
                }
            }
        })
        if(errorArray.length > 0){
            return res.json({message:'error',errorArray})
        }else{
            next();
        }
    }
}

export default validation;