import React from 'react';

const MyOrdersCard = ({myCards}) => {
    const {category,useTime,productImage,price,purchase,status,location,name} = myCards;
    // console.log(productImage)
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={productImage} alt="notavailable" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
               <h2 className="card-title text-2xl">{name}</h2>
                <h2 className="card-title text">{status}</h2>
                <h1 className='text-4xl'>{category}</h1>
                <p className='font-bold'>Orginal Price:  {purchase}</p>
                <p className='font-bold text-red-500'>Sale Price:  {price}</p>
                <p> Use:  {useTime}</p>
                <p>Location:  {location}</p>
        </div>
      </div>

    );
};

export default MyOrdersCard;