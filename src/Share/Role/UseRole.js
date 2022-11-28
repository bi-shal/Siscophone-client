import  { useContext, useEffect, useState } from 'react';
import { json } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const UseRole = () => {
    const {user} = useContext(AuthContext);
    // const email= user
     const [isRole,setIsRole] = useState('');
console.log('role',isRole);

    useEffect(() => {
        fetch(`http://localhost:5000/users/${user?.email}`)
        .then(res => res>json())
        .then(data => {
            console.log(data.role)
            setIsRole(data.role);
        })

    },[user?.email]);
    return [isRole];
};

export default UseRole;