import React from 'react';

const Card = ({cards }) => {
    const {category,productImage, quality,status} = cards;
    return (
   
<div className="card w-96 bg-base-100 shadow-xl">
  <figure className="px-10 pt-10">
    <img src={productImage} alt="Shoes" className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title text-2xl">{category}</h2>
    <h2 className="card-title">{quality}</h2>
    <h2 className="card-title text-sm">{status}</h2>
  
  </div>
</div>
    );
};

export default Card;


