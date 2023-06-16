import messageModel from "../../../../DB/model/message.model.js";
import userModel from "../../../../DB/model/user.model.js";


export const sendMessage = async (req,res)=>{
    const {receiverId} = req.params;
    const {message} = req.body;
    const user = await userModel.findById(receiverId);
    if(!user){
        return res.status(404).json({message:'invalid receiver'})
    }
    const createMessage = await messageModel.create({receiverId,message});
    return res.json({message:'success',createMessage})
}

export const getMessage = async (req, res) => {
    const messageList = await messageModel.find({receiverId:req.id});
    return res.json({message:'success',messageList});
}

export const deleteMessage = async (req, res) => {
    const id = req.id;
    const {messageId} = req.params;
    const message = await messageModel.deleteOne({_id:messageId,receiverId:id});
    if(!message.deletedCount==0){
        return res.json({message:'invalid message id or user id'});
    }
    return res.json({message:'success',message});

}