import React, { useState,useEffect,useRef } from 'react'
import './css/Card.css';
import pizza4 from '../assets/pizza4.jpg';
import { useCart,useDispatchCart } from './reducer/useRedeucer';

const Card = (props) => {

let dispatch=useDispatchCart();
let data=useCart();
const priceRef=useRef();
let options=props.options;
let priceOptions=Object.keys(options);
const [qty,setQty]=useState(1);
const [size,setSize]=useState("");



const handleAddToCart=async()=>{

    let food = []
    for (const item of data){
        if(item.id === props.foodItem._id){
            food=item;
            break;
        }
    }

if(food !== []){
    if(food.size === size){
        await dispatch({type:"UPDATE",id:props.foodItem._id,price:finalPrice,qty:qty,size:size})
        return;
    }else if(food.size !== size){
        await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size})
        return;
    }
    return;
   
}
    await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name, price:finalPrice,qty:qty,size:size})
    console.log(data);

}


useEffect(()=>{
    setSize(priceRef.current.value);
},[])
let finalPrice= qty * parseInt(options[size]);
    return (
        <>
            <div>

                <div className="card  mt-4 " >
                    <img src={props.foodItem.img} class="card-img-top img-fluid " alt="pizza" />
                    <div className="card-body bg-primary text-white bg-dark my-3">
                        <h4 className="card-title text-warning ">{props.foodItem.name}</h4>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <div className="pt-3">
                            <select className='me-3 mb-4' onChange={(e)=>setQty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {   
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )

                                })

                                }
                            </select>
                            <select className='me-3' ref={priceRef}  onChange={(e)=>setSize(e.target.value)}>
                              
                              {priceOptions.map((data)=>{
                                return <option key={data} value={data}>{data}
                                </option>
                              })}


                                
                            </select>

                            <div className='d-inline'>Rs.{finalPrice}/-</div>

                        </div>
                        <hr></hr>
                        <div className='text-center my-3'>
                            <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
                        </div>

                    </div>
                </div>

            </div>



        </>
    )
}

export default Card