const express= require('express');
const app=express();
const router =express.Router();
const bodyParser=require('body-parser');
let path= require('path');
const session=require('express-session');
let cookieParser=require('cookie-parser');
const dotenv= require ('dotenv');
dotenv.config({path:'./config.env'});
const foodrouter=require('./route/fooditemroute');
const userRouter=require('./route/userroute');
const orderRouter=require('./route/orderroute');
const PORT=process.env.PORT;

/////////////////////////////////////////////////////

require('./db/database');
require('./model/foodschema');
require('./model/foodcategory');
require('./model/User');
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',foodrouter);
app.use('/',userRouter);
app.use('/',orderRouter);



////////////////////////////////////////////////////////////

app.use(express.static(path.join(__dirname,"./client/build")));
app.get("*",function(_,res){
    res.sendFile(
        path.join(__dirname,"./client/build/index.html"),
        function(err){
            res.status(500).send(err);
        }   
    )
});



///////////////////////////////////////////////////////////////

app.get('/',(req,res)=>{
    res.send('hello world');
})


app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})