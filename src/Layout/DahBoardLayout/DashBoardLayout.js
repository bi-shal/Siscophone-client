import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import Navber from '../../Share/Navber/Navber';
// import useAdmin from '../hooks/useAdmin';




const DashBoardLayout = () => {
    const { user } = useContext(AuthContext);
    
    const [users,setUsers] = useState([])
    // console.log(users);

    // const [isAdmin] = useAdmin(user?.email)



    useEffect(()=>{

        axios.get(`http://localhost:5000/user/${user?.email}`,{
            headers:{
                "authorizaion": `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => {
            // console.log(res?.data);
            setUsers(res?.data?.data)
            // const accessToken = res?.data?.data;
            // setToken(accessToken)
            // localStorage.setItem('accessToken', accessToken)
        })

    },[user?.email])




    return (
        <div>
            <Navber></Navber>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">
                        
                        {/* <li><Link to="/dashboard/allusers">All users</Link></li> */}
                                <li><Link to="/dashboard/myorders">MyProduct</Link></li>
                                <li><Link to="/dashboard/addproducts">AddProduct</Link></li>
                        {/* {
                            isAdmin && <>
                                <li><Link to="/dashboard/allusers">All users</Link></li>
                                <li><Link to="/dashboard/adddoctor">Add A Doctor</Link></li>
                                <li><Link to="/dashboard/managedoctors">Manage Doctors</Link></li>
                            </>
                        } */}


                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;