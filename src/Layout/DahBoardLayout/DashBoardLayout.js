import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import Navber from '../../Share/Navber/Navber';
// import useAdmin from '../hooks/useAdmin';


const DashBoardLayout = () => {
    const { user } = useContext(AuthContext);
    // console.log(user);
    const [users,setUsers] = useState([])
    console.log(users?.role)
    // const [isAdmin] = useAdmin(user?.email)

    useEffect(()=>{

        axios.get(`http://localhost:5000/usersCreate/${user?.email}`)
        .then(res => {
            // console.log(res?.data);
            setUsers(res?.data)
            // setToken(accessToken)
        })

    },[user?.email])


	// useEffect(()=>{

    //     axios.get(`http://localhost:5000/${user?.email}`)
    //     .then(res => {
    //         console.log(res?.data);
    //         setUsers(res?.data)
    //         // setToken(accessToken)
    //     })


    // },[user?.email])


    // const dataUser =  users?.filter(us => us.email === user?.email)
    // console.log(dataUser)

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
                    {/* <ul className="menu p-4 w-80 text-base-content">


                        {
                            dataUser[0]?.role === 'seller'  ?
                            <>
                            <li><Link to="/dashboard/myorders">MyProduct</Link></li>
                                
                            </>
                            :
                            <>
                            <li><Link to="/dashboard/addproducts">AddProduct</Link></li>
                            </>

                        }
 
                    </ul> */}

<div className="h-full p-3 space-y-2 w-60 dark:bg-gray-900 dark:text-gray-100">
	<div className="flex items-center p-2 space-x-4">
		<img src="" alt="h" className="w-12 h-12 rounded-full dark:bg-gray-500" />
		<div>
			<h2 className="text-lg font-semibold">Leroy Jenkins</h2>
			<span className="flex items-center space-x-1">
				<Link to='/'  className="text-xs hover:underline dark:text-gray-400">View profile</Link>
			</span>
		</div>
	</div>
	<div className="divide-y divide-gray-700">
		<ul className="pt-2 pb-4 space-y-1 text-sm">
			<li className="dark:bg-gray-800 dark:text-gray-50">
				<Link to='/' className="flex items-center p-2 space-x-3 rounded-md">
					
					<span>Dashboard</span>
				</Link>
			</li>
			{ users?.role === 'seller'  ?


<>
            <li>
				<Link to='/dashboard/addproducts' className="flex items-center p-2 space-x-3 rounded-md">
					
					<span><p>AddProduct</p></span>
				</Link>
			</li>
			<li>
				<Link to='/dashboard/myProduct' className="flex items-center p-2 space-x-3 rounded-md">
					
					<span><p>MyProducts</p></span>
				</Link>
			</li>
            </>
                
			:
			<>
            <li>
				<Link to='/dashboard/myorders' className="flex items-center p-2 space-x-3 rounded-md">
					
					<span><p>MyOrders</p></span>
				</Link>
			</li>
            <li>
				<Link to='/' className="flex items-center p-2 space-x-3 rounded-md">
					
					<span>Wishlist</span>
				</Link>
			</li>
            </>
            }
			
		</ul>
		<ul className="pt-4 pb-2 space-y-1 text-sm">
			
			<li>
				<Link to='/' className="flex items-center p-2 space-x-3 rounded-md">
					
					<span>Logout</span>
				</Link>
			</li>
		</ul>
	</div>
</div>




                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;