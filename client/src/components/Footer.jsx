import React from 'react'
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <>
        <footer className="mt-4 border-top bg-dark ">
    <div className=" d-flex flex-column flex-wrap justify-content-center align-items-center gap-2 fs-4">
      <Link to="/" className="mb-3 me-2 mb-md-0 text-white text-decoration-none lh-1">
      </Link>
      <span className="mb-3 mb-md-0 text-white ">© 2023 Company, Inc</span>
    

    
    <ul className="nav  justify-content-end list-unstyled d-flex mx-3 pb-3">
      <li className="ms-3"><a className="text-white" href="https://twitter.com/"><i className="fa fa-twitter-square bg-info fs-2" aria-hidden="true"></i></a></li>
      <li className="ms-3"><a className="text-white" href="https://instagram.com/"><i className="fa fa-instagram bg-danger fs-2" aria-hidden="true"></i></a></li>
      <li className="ms-3"><a className="text-white" href="https://linkedin.com/"><i className="fa fa-linkedin-square  fs-2 bg-primary" aria-hidden="true"></i></a></li>
      <li className="ms-3"><a className="text-white" href="https://facebook.com/"><i className="fa fa-facebook-official fs-2 bg-primary" aria-hidden="true"></i></a></li>
      
    </ul>
    </div>
  </footer>
    </>
  )
}

export default Footer