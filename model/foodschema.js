const mongoose=require('mongoose');
require('../db/database');

const foodschema=new mongoose.Schema({

    
        CategoryName: {
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        } ,
        img:{
            type:String,
            required:true
        },
        options: [
            
            {
              
            }
        ],
        description:{
            type:String,
            required:true
        } 
}) 


module.exports=mongoose.model("Fooditem",foodschema);


