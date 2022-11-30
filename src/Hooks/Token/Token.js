import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const Token = (email) => {
    console.log(email)
    const {user} = useContext(AuthContext);
    const[token,setToken] = useState('');
    console.log(token)

    useEffect(()=>{
        if(email){
            fetch(`http://localhost:5000/jwt?email=${email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.accessToken){
                    localStorage.setItem("accessToken", data.accessToken);
                    setToken(data.accessToken);
                }
            })
        }

    },[email])

    return [token];
};

export default Token;