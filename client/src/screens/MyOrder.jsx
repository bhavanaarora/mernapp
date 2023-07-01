import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';

const MyOrder = () => {

    const [orderData, setOrderData] = useState({});
    const [userData,setUserData]=useState({});

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        await fetch('/myOrderData', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: localStorage.getItem('userEmail') })
        }).then(async (res) => {
            let response = await res.json();
             setOrderData(response)
             setUserData(response.data)
             console.log(userData.name);
            
            
        })
    }


    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <div className='row'>
                  <h2 className='mt-3 text-warning'>Welcome {userData ? userData.name : ""} !</h2>
                  
                    {orderData !== {} ? Array(orderData).map(data => {
                    
                    
                        return (
                            
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div className='text-white'>
                                                    {arrayData.Order_date ? <div className='m-auto mt-5'>
                                                    <h2 className='text-white'>
                                                        {data = arrayData.Order_date}
                                                        
                                                        </h2>
                                                        <hr />
                                                    </div> :

                                                        <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card mt-3 mb-5  w-75 " style={{ maxHeight: "360px" }}>
                                                               
                                                                <div className="card-body">

                                                                    <h4 className="card-title">{arrayData.name}</h4>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>
                                                                        {/* <span className='m-1'>{data}</span> */}
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>



                                                    }

                                                </div>
                                            )
                                        })

                                    )
                                }) :<h2 className='text-white d-flex justify-content-center mt-4'>There Is No Order !</h2>
                        )
                    }) : ""}
                </div>


            </div>

         
        </>
    )
}

export default MyOrder

