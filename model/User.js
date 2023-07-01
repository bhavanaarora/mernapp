const mongoose=require('mongoose');
require('../db/database');
const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    tokens:[
        {
          token:{
            type:String,
            required:true
          }
        }
      ]
});



//create authenticate token
userSchema.methods.generateAuthToken=async function()
{
  try{
    let token=jwt.sign({_id:this._id},
      process.env.SECRET_KEY);
      this.tokens=this.tokens.concat({token:token});
      await this.save();
      return token;     
      
  }catch(err){
    console.log(err);
  }
}

 
//create hash Password

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12);
        this.confirmPassword=await bcrypt.hash(this.confirmPassword,12);
    }
    next();

});

module.exports=mongoose.model('user',userSchema);