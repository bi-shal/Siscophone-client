import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import BuyNowcards from './BuyNowcards';

const BuyNow = () => {
    const {user} = useContext(AuthContext);
    const [shop,setShop] = useState([]);
    console.log(shop.length)

    useEffect(()=>{
        axios.get(`http://localhost:5000/shop`)
        .then(res => {
            setShop(res?.data)
            // console.log(res);
            // setToken(accessToken)
        })
      
      },[user?.email])

    return (
        <div className='my-20'>
            
  <div>
<h1 className='text-5xl text-cyan-500 font-bold text-center my-5'>BUY NOW !!!</h1>
  <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      
  
      {
          shop.map(cards => <BuyNowcards
              key={cards._id}
              cards={cards}
          ></BuyNowcards>)
      }
    </div>
  </div>


 
        </div>
    );
};

export default BuyNow;
