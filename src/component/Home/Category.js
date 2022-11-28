import React, { useState } from 'react';
// import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

// import Loader from '../../Shared/Loader/Loader';


const Category = () => {

    const [loading,setloading] = useState(true)
    console.log(loading);

    // const { data: catagory = [], } = useQuery({
    //     queryKey: ['catagory'],
    //     queryFn: async () => {
    //         const res = await fetch('http://localhost:5000/api/category/:id');
    //         const data = await res.json();
    //         if(data){
    //             setloading(false)
    //         }
    //         return data;
    //     }
    // });
   
    // if(loading){
    //     <Loader></Loader>
    // }
    return (
        
        <div className='my-10'>
           <h1 className='text-4xl font-bold mb-10 text-center'>Catagory</h1>
           <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 w-2/4 gap-6 mx-auto">
           {/* {

            catagory.map((cat)=><>
            <Link to={`catagory/${cat._id}`}><button className="btn btn-wide">{cat.catagory}</button></Link>
            
            </>)
            
           } */}
           </div>
           
        </div>
    );
};

export default Category;