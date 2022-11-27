import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Category = ({cat}) => {

    const {user} = useContext(AuthContext)
    // const [categories,setCategories] = useState([]);
    // console.log(categories)
    
    
    // useEffect(()=>{
    //   fetch('categoryData.json')
    //   .then(res => res.json())
    //   .then(data => {
    //     setCategories(data)
    //   })
    //   .catch(error => console.log(error))
    
    // },[user])


    return (
        <div>
            <Link to={`/check/${cat.category}`} rel="noopener noreferrer"  className="flex items-center flex-shrink-0 px-5 py-2 border-b-4 dark:border-gray-700 hover:dark:border-violet-400 dark:text-gray-50 text-xl">{cat.name}</Link>
	
{/* {
    categories.map((cate,id) => {

    })
} */}

        </div>
    );
};

export default Category;