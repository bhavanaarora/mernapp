import React, { useContext, useState } from 'react'
import { useCart } from './reducer/useRedeucer';
import './css/Navbar.css';
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import Modal from '../Modal';
import Cart from '../screens/Cart';  


const Navbar = () => {
  let data = useCart();

  const [cartView,setCartView]=useState(false);

  const { state, dispatch } = useContext(UserContext);
  const RenderMenu = () => {
    if (state) {
      return (
        <>
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link " aria-current="page" to="/">Home</Link>
            </li>
          
            <li className="nav-item">
              <Link className="nav-link " aria-current="page" to="/MyOrder">My Orders</Link>
            </li>
          </ul>

          <div className='d-flex '>
        
            <Link className="nav-link text-white fw-bold me-3 mb-sm-2 mb-xl-0  " onClick={()=>{setCartView(true)}} >My Cart {" "} 
            <span class="badge badge-pill bg-danger"> {data.length}</span>
            </Link>            
            </div>
            
            {cartView ? <Modal onClose={()=> setCartView(false) }><Cart /></Modal> : null}
              
            <Link className="nav-link text-white fs-4 fw-bold  me-3 " to="/logout">Logout</Link>
            

        </>
      )
    } else {
      return (
        <>
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link fs-4 fw-bold" aria-current="page" to="/">Home</Link>
            </li>
            </ul>
            <div className='d-flex'>
              <Link className="nav-link text-white fs-4 fw-bold me-3 " to="/login">Login</Link>
              </div>
             
        </>
      )
    }
  }

return (
    <>

      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} className='img-fluid' alt='logo' />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">

            <RenderMenu />

          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar