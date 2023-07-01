import React,{useEffect,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import {UserContext} from '../App';

const Logout = () => {
    const {state,dispatch}= useContext(UserContext);

const navigate=useNavigate();

useEffect(()=>{

    fetch('/logout',{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        credentials:"include"
    }).then((res)=>{
        dispatch({type:"User",payload:false})
        console.log(state);
        navigate('/Login');
        if(res.status !== 200)
        {
            const error = new Error(res.error);
            throw error;
        }

    }).catch((err)=>{
        console.log(err);
    })

})



  return (
    <>
       <h2 className='text-white'>Logout</h2> 
    </>
  )
}

export default Logout
