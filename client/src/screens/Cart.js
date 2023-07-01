import React from 'react'
import { useCart, useDispatchCart } from '../components/reducer/useRedeucer'
const Cart = () => {
    let data=useCart();
    let dispatch=useDispatchCart();
    if(data.length === 0){
        return(
            <div>
                <div className='m-5 w-100 text-center text-white fs-3'> The Cart is Empty!</div>
            </div>
        )
    }

const handleCheckOut= async()=>{

    let userEmail=localStorage.getItem("userEmail");
    console.log(userEmail);
    let response=await fetch('/orderData',{ 
     method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
        order_data:data,
        email:userEmail,
        order_date:new Date().toDateString()
    })
  });
  
  
    if(response.status === 200){
    console.log("drop dispatch");
    dispatch({type:"DROP"})
  }

 else{
    console.log("error");
  }
}



let totalPrice=data.reduce((total,food)=>total + food.price,0)


  return (
    <>
   <div className='container m-auto mt-5 table-responsive-sm table-responsive-md'>
    <table className='table table-hover'>
    <thead className='text-white bg-secondary fs-4'>
    <tr>
        <th scope='col'>#</th>
        <th scope='col'>Name</th>
        <th scope='col'>Quantity</th>
        <th scope='col'>Option</th>
        <th scope='col'>Amount</th>
        <th scope='col'></th>
    </tr>
    </thead>
    <tbody className=' bg-warning '>
        {data.map((food,index)=>(
            <tr className='fs-3'>
                <td scope='row'>{index+1}</td>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td><button type='button' className='btn bg-secondary p-2 text-white'onClick={()=>{dispatch({type:"REMOVE",index:index})}}><i class="fa fa-trash fs-4" aria-hidden="true">  Delete</i></button></td>
            </tr>
        ))}
    </tbody>
    </table>

    <div><h1 className='fs-2 text-white'>Total Price:{totalPrice}/-</h1></div>
    <div>
        <button  type='button' className='btn p-0 text-white bg-primary mt-3 p-2 fs-4' onClick={handleCheckOut}>Check Out    
        </button>
    </div>

     
   </div>



    </>
  )
}

export default Cart