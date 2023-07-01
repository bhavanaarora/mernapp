import React from 'react'
import './css/Carousel.css';
import pizza1 from '../assets/pizza1.jpg';
const Carousel = () => {
    return (
        <>
            <div id="carousel" className=" carousel carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-caption d-none d-md-block">
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-success text-white " type="submit">Search</button>
                        </form>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/?pizza" className="img- fluid  d-block w-100" alt="Pizza" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/?pizza" className="img- fluid d-block w-100" alt="Pizza" />
                    </div>
                    <div className="carousel-item">
                        <img src={pizza1} className="img- fluid d-block w-100" alt="Pizza" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>





        </>
    )
}

export default Carousel