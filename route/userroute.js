const express=require('express');
const router=express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('../db/database');
const authenticate=require('../middleware/authenticate');

const User=require('../model/User');

router.post('/signup',async(req,res)=>{
  let phoneno = /^\d{10}$/;
  let mailformat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const regexName = (/^[A-Za-z]+$/); 

    console.log("enter in signup");
     const {name,location,email,mobile,password,confirmPassword}=req.body;

     if(!name || !location || !email || !mobile || !password || !confirmPassword){
     return res.status(422).json({error:"fields can not be blank" });
     }

     else if(!(req.body.name.match(regexName))){           
      return res.status(403).json({message:"pls enter valid Name"});
     }

     else if(!(req.body.email.match(mailformat))){           
      return res.status(404).json({message:"pls enter valid Email Address"});
     }

     else if(!(req.body.mobile.match(phoneno))){
           
      return res.status(406).json({message:"pls enter valid Mobile Number"});

     }
     try{
          const userExist=await User.findOne({email:email});
          if(userExist){
            return res.status(401).json({message:"User already Exist"});
          }
          else if(password != confirmPassword){
            return res.status(402).json({message:"Password and Confirm password does not match"});
          }
          const user= new User({name,location,email,mobile,password,confirmPassword});
          const userRegister= await user.save();
          if(userRegister){
            res.status(201).json({message:"User Successfully Register"});
          }
    
    }catch(error){
     console.log(error);        
    }
})

//login user

router.post('/Login', async (req, res) => {
    
  try {
      let token;
      const { email, password } = req.body;
      console.log(req.body);
     
      if (!email || !password) {
          return res.status(401).json({ error: 'plz filled the data' })
      }
      const userLogin = await User.findOne({ email: email });
      console.log(userLogin);
     
      if (userLogin) {
          const isMatch = await bcrypt.compare(password, userLogin.password);
                      
          token=await userLogin.generateAuthToken();
          console.log(token);
         
          res.cookie('jwtoken',token,{expires:new Date(Date.now()+ 25892000000),
              httpOnly:true
          })
  
           if (!isMatch) {
            return res.status(404).json({ error: "invalid credentials" });
          }
          else {
              // res.json({ message: "user signin successfully" });
               res.json(token);
          }
      }

      else {
        return res.status(400).json({ error: " else invalid credentials" });

      }
  }
  catch (err) {
      console.log(err);
  }

});

router.get('/orderhistory',authenticate,(req,res)=>{
  console.log("user order history");
  res.send(req.rootUser);
})

router.get('/logout',(req,res)=>{
  res.clearCookie("jwtoken",{path:'/'});
  res.status(200).send('user logout');
})

module.exports=router;