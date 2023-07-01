import React,{useState} from 'react'
// import {Link} from 'react-router-dom';
const Form = ()=>{
    
const [user,setUser]=useState({
    email:"",
    password:""
});

let name,value;
const handleInputs=(e)=>{
name=e.target.name;
value=e.target.value;
setUser({...user,[name]:value})
}
return(

    <>
    <div className='container mx-auto d-flex justify-content-center mt-5'> 
    <form method='POST' className='w-50 my-5 bg-primary p-5'>
    <h1 className='text-white text-center'>Login</h1>
  
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' onChange={handleInputs} value={user.email} aria-describedby="emailHelp"/>   
  </div>

  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' onChange={handleInputs} value={user.password}/>
  </div>

  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
 <div className='text-center'> <button type="submit" className="btn btn-primary">Submit</button></div>
</form>
</div>
    </>
  )
}

export default Form