import axios from "axios";
import { useEffect, useState } from "react";

const useToken =(user) => {
    const [token, setToken] = useState('')
    // const [dataa,setDataa] = useState(null)
    // console.log(dataa);
    // console.log(`use Token ${user?.email}`);

    useEffect(() => {
        const email  = user?.email;
        const uid = user?.uid;
        // console.log(email,uid)


        const currentUser = {
            email:email,
            uid: uid
        }
        // console.log(currentUser)

        if (email && uid){
          
            
            axios.put(`http://localhost:5000/user/${email}`, currentUser)
            .then(res => {
                // console.log(res?.data?.data);
                const accessToken = res?.data?.data;
                // setToken(accessToken)
                localStorage.setItem('accessToken', accessToken)
            })

            

 }
    },[user])

    return [token]
}

export default useToken