import React from 'react';

const CategoryCardss = ({cards}) => {
    const {category,productImage,purchase,status,productName,price,useTime,status_id} = cards;
    // console.log(CategoryCardss.productImage);
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={productImage} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl">{productName}</h2>
          <h2 className="card-title">{price}</h2>
          <h2 className="card-title text">{status}</h2>
          {/* <h1 className='text-4xl'>{name}</h1> */}
          <p className='font-bold'>Orginal Price:  {purchase}</p>
          <p className='font-bold text-red-500'>Sale Price:  {price}</p>
          <p> Use:  {useTime}</p>
          
      
          {/* <label
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
              } */}
      
      
        </div>
      </div>
    );
};

export default CategoryCardss;