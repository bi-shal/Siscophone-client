
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import toast from 'react-hot-toast';


const MyProduct = () => {
    const { user } = useContext(AuthContext)
const [product,setProduct] = useState([])
// console.log(product);

const [dele,setDelet] = useState('')

useEffect(()=>{
    axios.get(`http://localhost:5000/bookings/${user?.email}`)
    .then(res => {
        console.log(res?.data);
        setProduct(res?.data)
        // setToken(accessToken)
    })

},[user?.email,dele])


const handleAds = (product) =>{
    
    console.log('click',product)
    fetch('http://localhost:5000/advertises', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            
        },
        body: JSON.stringify(product)
    })
        .then(res => res.json())
        .then(result => {
            console.log(result);
            toast.success('Advertise successfully');
            // navigate('/dashboard/my-product')
        }).catch(error => console.log(error))     
 
}

const handleDelete = (product) =>{
    
    // console.log(product);
    fetch(`http://localhost:5000/delete/${product}`,{
        method:"DELETE"
    })
        .then(res => res.json())
        .then(result => {
            console.log('CLICK',result);
            setDelet(result)
            toast.success('Advertise successfully');
            // navigate('/dashboard/my-product')
        })
    
}
   
    return (
        <div>
           <div className="overflow-x-auto">
                {
                    product.length > 0 ?
                    <>
                     <table className="table w-full">
                   <thead>
                         <tr>
                             <th></th>
                                <th>Image</th>
                             <th>Name</th>
                             <th>Unsold/Available</th>
                             <th>Advertise</th>
                            <th>Delete</th>
                         </tr>
                   </thead>
                    <tbody>
                        {
                            product.map((product, i) => <tr key={product._id}>
                                <th>{i + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={product.productImage} alt='' />
                                        </div>
                                    </div>
                                </td>
                                <td>{product.productName}</td>
                                <td><button className="btn btn-secondary">Available</button></td>
                                <td><button
                                
                                 onClick={()=>handleAds(product)} className="btn btn-outline btn-secondary" >Ads Now</button></td>
                                <td><button
                                onClick={()=>handleDelete(product._id)}
                                 className="btn btn-secondary" >Delete</button></td>
                            </tr>)
                                              
                         }
                    </tbody>
                </table>
                    </>
                    :
                    <>
                    <h1 className='text-4xl text-center text-violet-700 font-bold'>NO PRODUCT AVAILABLE !!!</h1>
                    <h1 className='text-4xl text-center text-amber-500 font-bold'>PLEASE ADD PRODUCT</h1>
                    </>
                }
            </div>
        </div>
    );
};

export default MyProduct;


