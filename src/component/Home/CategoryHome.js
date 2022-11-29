import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const CategoryHome = ({cat}) => {
    const {user} = useContext(AuthContext)
    // console.log(cat.name);
    const {name,img} = cat;
    // const [cate,setcate] =useState([])
    console.log(cat)

    // useEffect(()=>{
    //     fetch('http://localhost:5000/categoryform')
    //     .then(res => res.json())
    //     .then(data => {
    //         setcate(data)
    //     })
    //     .catch(error => console.log(error))
      
    //   },[user])


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