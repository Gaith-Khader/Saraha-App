import 'dotenv/config';
import express from 'express';
import initApp from './src/Moduels/app.router.js'
import connectDb from './DB/connection.js';
const app = express();
const port = 3000;

initApp(app,express);
connectDb().then(()=>{
    app.listen(process.env.PORT || port,()=>{
        console.log(`=================SERVER ON ${port}=================`);
    });
})