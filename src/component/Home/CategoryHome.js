import React from 'react';
import { Link } from 'react-router-dom';


const CategoryHome = ({cat}) => {
   
    const {name} = cat;
 
    return (
        <div>
            <div className="card w-100 bg-base-100 shadow-xl image-full">
  {/* <figure><img src={img} alt="Shoes" /></figure> */}
  <div className="card-body">
    <h2 className="card-title text-2xl ">All {name} Category phone</h2>
    <p>Find Your Phone !!!</p>
    <div className="card-actions justify-center">
      
      <Link to={`/categoryForm/${cat?.name}`}><button className="btn btn-primary ">{name}</button></Link>
    </div>
  </div>
</div>
        </div>
    );
};

export default CategoryHome;