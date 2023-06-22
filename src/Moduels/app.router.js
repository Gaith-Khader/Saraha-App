import connectDb from '../../DB/connection.js'
import { auth } from '../Middleware/auth.middleware.js'
import { globalErrorHandler } from '../Services/errorHandling.js'
import AuthRouter from './Auth/Auth.router.js'
import MessageRouter from './Message/Message.router.js'
import UserRouter from './User/User.router.js'

const initApp=(app,express)=>{
    app.use(express.json());
    app.use('/auth', AuthRouter);
    app.use('/message', MessageRouter);
    app.use('/users',auth, UserRouter);
    app.use('/',(req,res)=>{
        res.send('hello')
    });
    app.use('/*',(req,res)=>{
        return res.json({message:'page not found'})
    })
    app.use(globalErrorHandler)
}

export default initApp;