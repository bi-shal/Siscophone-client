import React, { useState } from 'react';
import BookModal from '../../Category/BookModal/BookModal';

const BuyNowcards = ({cards}) => {
  // console.log(cards)
    const {useTime,productImage,price,purchase,status,location,name} = cards;
    const [order,setOrder] = useState([])
    // console.count(typeof(order),order)

    return (
   
<div className="card w-96 bg-base-100 shadow-xl">
  <figure className="px-10 pt-10">
    <img src={productImage} alt="Shoes" className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title text-2xl">{name}</h2>
    {/* <h2 className="card-title">{quality}</h2> */}
    <h2 className="card-title text">{status}</h2>
    {/* <h1 className='text-4xl'>{name}</h1> */}
    <p className='font-bold'>Orginal Price:  {purchase}</p>
    <p className='font-bold text-red-500'>Sale Price:  {price}</p>
    <p> Use:  {useTime}</p>
    <p>Location:  {location}</p>
    

    <label
        htmlFor="bookModal"
        className="btn btn-green text-white"
        onClick={() => setOrder(cards)}
        >Book Now
    </label>

        {
            order && <BookModal        
                order={order}
                setOrder={setOrder}
                >
                </BookModal>
        }


  </div>
</div>
    );
};

export default BuyNowcards;