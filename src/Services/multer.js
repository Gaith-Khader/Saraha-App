import multer from "multer";

export const HME = (err,req,res,next) => {
    if (err) {
        return res.json({message:'multer err',err});
    }
    next();
}
function fileUpload(){

    const storage = multer.diskStorage({})

    function fileFilter(req,file,cb){
        if(['image/jpeg','image/png','image/gif'].includes(file.mimetype)){
            cb(null,true);
        }else{
            cb('invalid file type',false);
        }
    }

    const upload = multer({fileFilter,storage});
    return upload
}


export default fileUpload;



// const storage = multer.diskStorage({
//     destination: (req,res,cb)=>{
//         cb(null,'uploads')
//     },
//     filename:(req,file,cb)=>{
//         cb(null,Date.now()+'_'+Math.random()+'_'+file.originalname)
//     }
// })