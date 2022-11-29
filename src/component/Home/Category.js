import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CategoryCardss from './CategoryCardss';

const Category = () => {
    const products = useLoaderData();
    console.log(products);
    return (
          <div className='my-20'>
            
  <div>
<h1 className='text-5xl text-cyan-500 font-bold text-center my-5'>PRODUCTS...</h1>
  <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      
  
      {
          products.map(cards => <CategoryCardss
              key={cards._id}
              cards={cards}
          ></CategoryCardss>)
      }
    </div>
  </div>


 
        </div>
    );
};

export default Category;