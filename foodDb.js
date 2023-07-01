const dotenv= require ('dotenv');
dotenv.config({path:'./config.env'});
let connectDB= require('./db/database');
const fooditem=require('./model/foodschema');
const foodcategory=require('./model/foodcategory');
const foodjson=require('./fooddata.json');
const foodcategoryjson=require('./foodcategory.json');

const start=async()=>{
    try{

     await  connectDB(process.env.DATABASE);
         await fooditem.create(foodjson);
         await foodcategory.create(foodcategoryjson);
         console.log('success');

    }catch(error){
    console.log(error);
    }

}
start();

