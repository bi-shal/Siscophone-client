import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import MyOrdersCard from './MyOrdersCard';

const Myorder = () => {
    const {user} = useContext(AuthContext);
    // console.log(user)
    const [orders,setOrders] = useState([]);

    useEffect(()=>{

        axios.get(`https://assignment-12-server-mocha.vercel.app/bookModal`)
        .then(res => {
            setOrders(res?.data)
            // setToken(accessToken)
        })

    },[user?.email])
    
    const myOrder = orders.filter(ord => ord?.email === user?.email)


    return (
        <div className='my-20'>
        
    <div>
    <h1 className='text-5xl text-cyan-500 font-bold text-center my-5'>Your Orders !!!</h1>
    <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

                    {
                        myOrder?.map(myCards => <MyOrdersCard
                            key={myCards._id}
                            myCards={myCards}
                        ></MyOrdersCard>)
                    }

            </div>
         </div>
    </div>
    );
};

export default Myorder;

