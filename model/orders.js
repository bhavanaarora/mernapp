const mongoose=require('mongoose');
require('../db/database');


const orderSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
        
    },
    order_data:{
        type:Array,
        required:true
    }
})

module.exports=mongoose.model('order',orderSchema);