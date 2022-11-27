import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import BuyNowcards from './BuyNowcards';

const BuyNow = () => {
    const {user,logOut} = useContext(AuthContext);
    const [shop,setShop] = useState([]);
    // console.log(shop)

    useEffect(()=>{
        axios.get(`http://localhost:5000/shop`)
        .then(res => {
            setShop(res?.data)
            // console.log(res);
            // setToken(accessToken)
        })
      
      },[user?.email])

    return (
        <div>
            {
  shop.length > 0  &&
  <div>
<h1 className='text-5xl text-cyan-500 font-bold text-center my-5'>BOOK NOW !!!</h1>
  <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      
  
      {
          shop.map(cards => <BuyNowcards
              key={cards._id}
              cards={cards}
          ></BuyNowcards>)
      }
    </div>
  </div>


 }
        </div>
    );
};

export default BuyNow;





// import React, { useState } from 'react';
// import { useLoaderData } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthProvider';
// import BookingModal from '../bookingModal/BookingModal';


// const ProductsDetails = () => {
//     const product = useLoaderData()
//     const [order,setOrder] =useState()
//     return (
//         <div className='lg:w-2/4 mx-auto my-40'>
//             <div  className='border w-96'>
//             <figure><img className='w-96' src={product.image} alt="Shoes" /></figure>
//             <div className='px-10 py-5'>
//                 <h1 className='text-4xl'>{product.name}</h1>
//                 <p>Orginal Price: {product.orginalPrice}</p>
//                 <p>Sale Price: {product.salePrice}</p>
//                 <p>Location: {product.location}</p>
//                 <p> Use: {product.use}</p>
//                 <p>Use Mils:  {product.useMils}</p>
                
//                 <label
//                         htmlFor="bookModal"
//                         className="btn btn-primary text-white"
//                         onClick={() => setOrder(product)}
//                     >Book Now</label>
//             </div>
//             </div>
            
//             {
//                 order && <BookingModal
            
//                 order={order}
//                 setOrder={setOrder}
//                 >
    
//                 </BookingModal>
//             }
//         </div>
//     );
// };

// export default ProductsDetails;