import React, {useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import pizza1 from '../assets/pizza1.jpg';
import pizza2 from '../assets/pizza2.jpg';
import pizza4 from '../assets/pizza4.jpg';
import '../components/css/Carousel.css';
import './css/Home.css';


const Home = () => {

  const [search,setSearch] = useState('');
  const [foodItem,setFoodItem]=useState([]);
  const [foodCat,setFoodCat]=useState([]);

  const loadData = async () => {
    
    try {
        const  res = await fetch('/foodData', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      // console.log(data[0], data[1]);
      setFoodItem(data[0]);
      setFoodCat(data[1]);
    }
    catch (err) {
      console.log(err);
    }

  };

  useEffect(() => {

    loadData();

  },[]);





  return (

    <>
      <div className='mx-auto'><Navbar /></div>
      <div className='mx-auto'>

      {/* Start Carousel */}
      <div id="carousel" className=" carousel carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-caption d-none d-md-block">
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                            
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src={pizza2} className="img- fluid  d-block w-100" alt="Pizza" />
                    </div>
                    <div className="carousel-item">
                        <img src={pizza4} className="img- fluid d-block w-100" alt="Pizza" />
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

      
      {/* End Crousel Div */}
      </div>
      <div className='container-fluid mt-3  mx-auto'>      

      {
          foodCat !== [] ? foodCat.map((data)=>{
            return(
              <>
              <hr className='text-white py-3 mt-5'/>
              <div key={data._id} className=' py-3  text-white'>
             <h2> {data.CategoryName} </h2>
              </div>            
            
              <div className='text-white mt-3 fs-3 fcontainer gap-3 '>
           
    
              {foodItem !== [] 
              ? 
              foodItem.filter((item)=>(item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
              .map(filterItems=>{
               return(

                <div key={filterItems._id} >
                <Card foodItem={filterItems}
                  options={filterItems.options[0]}
                 />
                  </div>
                
                           
               )

              })
              :<div> No Such Data Found!</div>
              }              
              </div>
              </>
            )

          })
          : <div> """"""""" </div>
     
      }

      </div>






      <div className='pt-5'><Footer /></div>
    </>
  )
}

export default Home