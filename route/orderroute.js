const express= require('express');
const router=express.Router();
const Order= require('../model/orders');
const User=require('../model/User');


router.post('/orderData',async(req,res)=>{
    let data=req.body.order_data;
    let email=req.body.email;

    await data.splice(0,0,{Order_date:req.body.order_date});
    let eId=await Order.findOne({email:req.body.email})
  
     if(eId === null){
    
        try{
            console.log("try blog");
            await Order.create({
                email:email,
                order_data:[data]
            }).then(()=>{
                // res.json({success:true})
                return res.status(200).json({success:true});
            })
          
        }catch(error){
            console.log(error);
            res.send("Server Error",error.message);
        }
    }
    else{
       
        try{
            console.log("2 try block");
            await Order.findOneAndUpdate({email:req.body.email},
                {$push:{order_data:data}}).then(()=>{
                res.json({success:true});
                })

        }catch(error){
            res.send("Server Error",error.message);


        }
    }
})


router.post('/myOrderData',async(req,res)=>{

    try{
          let orderData=await Order.findOne({'email':req.body.email});
          let data=await User.findOne({'email':req.body.email});
           res.send({orderData,data});
         
        
        }catch(error){
            
            console.log(error);
    }
})
module.exports=router;