import React, { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './css/signup.css';
import pizza1 from '../assets/pizza1.jpg';



const Signup = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    location: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: ""
  });

  const [formErrors, setFormErrors] = useState({});
  const [isState, setIsState] = useState(false);

  // const [isEmailState,setEmailState] = useState(true);

  const errors = {};

  let name, value;

  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  }

  const PostData = async (e) => {
    let res;
    e.preventDefault();
    setFormErrors(validate(user));
    

    const { name, location, email, mobile, password, confirmPassword } = user;
    res = await fetch('/signup', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, location, email, mobile, password, confirmPassword })
    });


    if (res.status === 422 || !res) {
      console.log('Fields can not be empty');
    }
    else if (res.status === 403 || !res) {
      console.log('Please Enter Valid Name:');
    }
    else if (res.status === 404 || !res) {
      console.log('Invalid Email');
    }
    else if (res.status === 406 || !res) {
      console.log('Mobile Number should be of 10 Digits');
    }
    else if (res.status === 401 || !res) {
     console.log('Invalid registration');
     window.alert("user already exist");
      // setEmailState(false);
    }
    else if (res.status === 402 || !res) {
      console.log('Passwords are not Matching');
    }
    else {
      setIsState(true);
      // setEmailState(true);
       console.log('Successful Registration');
    ResetForm();
      // navigate('/Login')
      
    }
  }

//validate user form
  const validate = (values) => {
    // const errors = {};
    const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const regexName = (/^[A-Za-z]+$/);

    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!regexName.test(values.name)) {
      errors.name = "UserName is not Valid";
    }
    if (!values.location) {
      errors.location = "Location is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!regex.test(values.email)) {
      errors.email = "Not a valid Email";
    }
    // if (isEmailState !== true ) {
    //   errors.email = "User already Exist";
    // }
    if (!values.mobile) {
      errors.mobile = "Mobile is required";
    }
    if (values.mobile.length !== 10) {
      errors.mobile = "Mobile Number should have 10 digits";
    }
    if (!values.password) {
      errors.password = "password is required";
    }
    if (values.password.length < 3) {
      errors.password = "Password must be more than 3 characters";
    }
    if (values.password.length > 10) {
      errors.password = "Password can not exceed more than 10 characters";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "confirmPassword is required";
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Password and Confirm Password should be same';
    }
    return errors;

  }

  const ResetForm = () => { 
    setUser({
      name: "",
      location: "",
      email: "",
      mobile:"",
      password:"",
      confirmPassword:""
    });
      const TimerMessage = setTimeout(() => {
      setIsState(false);
      navigate('/Login');
      }, 3000); 
      console.log(TimerMessage);
  }

  return (
    <>
      <div><Navbar /></div>
      <div className='container d-flex justify-content-center text-start '>

        <img id='img2' src={pizza1} className="img- fluid d-block w-100" alt="Pizza" />
        

        <form id='form2' className="form  mx-auto pt-5" method='POST'>

          <h1 className="text-center text-white fw-bold mb-3">SignUp</h1>
      
          {isState ? (<h5 className='text-warning  fs-4 fw-bold'>Successful Registration </h5>) : null}
         
         
   
          <div className="form-group was-validated">
            <label className="form-label  text-white" for="name">Name</label>
            <input className="form-control" type="text" name="name" value={user.name} onChange={handleInputs} autoComplete="off" required />
          </div>
          <p className='text-warning fs-5'>{formErrors.name}</p>


          <div className="form-group was-validated">
            <label className="form-label " for="location">Location</label>
            <input className="form-control" type="text" name="location"
              value={user.location} onChange={handleInputs} autoComplete="off" required />
          </div>
          <p className='text-warning fs-5'>{formErrors.location}</p>

          <div className="form-group was-validated">
            <label className="form-label " for="email">Email Address</label>
            <input className="form-control" type="email" name="email" value={user.email} onChange={handleInputs} autoComplete="off" required />
          </div>
          <p className='text-warning fs-5'>{formErrors.email}</p>

          <div className="form-group was-validated">
            <label className="form-label " for="mobile">Mobile</label>
            <input className="form-control" type="text" name="mobile" value={user.mobile} onChange={handleInputs} autoComplete="off" required />
          </div>
          <p className='text-warning fs-5'>{formErrors.mobile}</p>

          <div className="form-group was-validated">
            <label className="form-label " for="password">Password</label>
            <input className="form-control" type="password" value={user.password} onChange={handleInputs} name="password" required />
          </div>
          <p className='text-warning fs-5'>{formErrors.password}</p>



          <div className="form-group was-validated">
            <label className="form-label" for="confirmPassword">
              Confirm Password</label>
            <input className="form-control" type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleInputs} required />
          </div>
          <p className='text-warning fs-5'>{formErrors.confirmPassword}</p>



          <div className="text-center mx-auto my-2 py-3 d-flex gap-3 justify-content-center">
            <input className="btn btn-primary" type="submit" name="submit" value="Submit" onClick={PostData} />
            <button className='btn  btn-primary ' onClick={ResetForm}>Reset</button>
            <Link className="btn btn-primary " type="button" to='/'>Close</Link>
        
          </div>
        
          <div className=" text-center ">
            <h5 className=' text-white '>Existing User: <Link to="/Login" type="button" className="fs-4   text-decoration-none text-primary fw-bold">Login</Link> </h5>
          </div>


        </form>




      </div>


      <Footer />

    </>
  )
}

export default Signup