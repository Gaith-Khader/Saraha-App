import mongoose from "mongoose";
const connectDb = async ()=>{
    return await mongoose.connect(process.env.DB_LOCAL)
    .then(()=>{
        console.log("==================DB CONNECTED==================");
    }).catch((err)=>{
        console.log(`err DB ${err}`);
    })
}
export default connectDb;