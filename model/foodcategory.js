const mongoose=require('mongoose');
require('../db/database');

foodCategorySchema=new mongoose.Schema(
{

    CategoryName:{
        type:String,
        required:true
    }

});

module.exports=mongoose.model('Foodcategory',foodCategorySchema);
