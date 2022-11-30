import  { useContext, useEffect, useState } from 'react';
import { json } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const UseRole = () => {
    const {user} = useContext(AuthContext);
    // const email= user
     const [isRole,setIsRole] = useState('');
console.log('role',isRole);

    useEffect(() => {
        fetch(`https://assignment-12-server-mocha.vercel.app/users/${user?.email}`)
        .then(res => res>json())
        .then(data => {
            console.log(data.role)
            setIsRole(data.role);
        })

    },[user?.email]);
    return [isRole];
};

export default UseRole;