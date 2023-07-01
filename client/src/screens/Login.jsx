import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './css/signup.css';
import pizza1 from '../assets/pizza1.jpg';
import {UserContext} from '../App';

const Login = () => {

  const {state,dispatch}= useContext(UserContext);

  const navigate = useNavigate();

  const [user, setUser] = useState({   
    email: "",   
    password: ""
    
  });
 
  const [formErrors, setFormErrors] = useState({});

  const errors={};

  let name, value;

  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  }
   
  const loginUser = async (e) => {

    e.preventDefault();
    setFormErrors(validate(user));    
    const {email,password} = user;
    const res = await fetch('/Login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password})
    })
    const data = await res.json();

    if (res.status === 401 || !res) {
       console.log('Fields Can Not be Blank');  
    }
    else if (res.status === 400 || !data) {
window.alert("Invalid Email");
}
else if (res.status === 404 || !res) {
  window.alert("Invalid Password");
  console.log('Invalid Password');  
}
else {
  dispatch({type:"User",payload:true})
  console.log(state);
window.alert("Login successfull");
localStorage.setItem("userEmail",email);
localStorage.setItem("authToken",res.token);
console.log(localStorage.getItem("authToken"));
navigate("/");
}

}

const validate=(values)=>{

  if (!values.email) {
    errors.email = "Email is required";
  }

  if (!values.password) {
    errors.password = "Password is required";
  }
  return errors;
}

  return (
    <>
      <div><Navbar /></div>       
      <div className='container d-flex justify-content-center text-start '>
             
              <img id='img2' src={pizza1} className="img- fluid d-block w-100" alt="Pizza"/>              
                <form id='form2' className="form  mx-auto pt-5 my-5 " method='POST'>
                  <h1 className="text-center text-white fw-bold mb-3">Login</h1>
                 

                  <div className="form-group was-validated">
                    <label className="form-label " for="email">Email Address</label>
                    <input className="form-control" type="email" name="email" autocomplete="off" value={user.email} onChange={handleInputs}  required />
                  </div>
                  <p className='text-warning fs-5'>{formErrors.email}</p>

                  <div className="form-group was-validated">
                    <label className="form-label " for="password">Password</label>
                    <input className="form-control" type="password" name="password" value={user.password} onChange={handleInputs}  required />
                  </div>
                  <p className='text-warning fs-5'>{formErrors.password}</p>

                  <div className="text-center mx-auto my-2 py-3 ">
                    <input className="btn btn-primary me-2 " type="submit" name="submit" value="Submit" onClick={loginUser} />
                    <Link className="btn btn-primary " type="button" to='/'>Close</Link>
                  </div>
                  <div className=" text-center ">
                    <h5 className=' text-white '>New User: <Link to="/Signup" type="button" className="fs-4   text-decoration-none text-primary">SignUp</Link> </h5>
                  </div>

                </form>
              </div>        

      <Footer />

    </>
  )
}

export default Login