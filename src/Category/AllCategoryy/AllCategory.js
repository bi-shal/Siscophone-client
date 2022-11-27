import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const AllCategory = () => {
    const {user} = useContext(AuthContext)
    const [categories,setCategories] = useState([]);
    console.log(categories)
    
    
    useEffect(()=>{
      fetch('categoryData.json')
      .then(res => res.json())
      .then(data => {
        setCategories(data)
      })
      .catch(error => console.log(error))
    
    },[user])
    return (
        <div>
            <h1>ALLLLLLLLLl</h1>
        </div>
    );
};

export default AllCategory;