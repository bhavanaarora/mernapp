const mongoose =require('mongoose');
 const url=process.env.DATABASE;
const connectDB=async()=>{
return mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

.then(()=>console.log('Database Connected'))
.catch((err)=>console.log(err));
}
connectDB();
module.exports=connectDB;
