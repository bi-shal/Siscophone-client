import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import Navber from '../../Share/Navber/Navber';


const DashBoardLayout = () => {
    const { user } = useContext(AuthContext);
    // console.log(user);
    const [users,setUsers] = useState([])
    // console.log(users);

    useEffect(()=>{

        axios.get(`http://localhost:5000/userrole/${user?.email}`)
        .then(res => {
            console.log(res?.data);
            setUsers(res?.data)
            
        })

    },[user?.email])





const seller = (
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
)

const buyer = (
    <>
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
    
    </>
)


const admin = (
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
)

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
	
	<div className="divide-y divide-gray-700">
		<ul className="pt-2 pb-4 space-y-1 text-sm">

          <>
          {users.role === 'seller' && seller}
            {users.role === 'buyer' && buyer}
            {users.role === 'admin' && admin}
                
          </>
            	
		</ul>
		<ul className="pt-4 pb-2 space-y-1 text-sm">
			
		</ul>
	</div>
</div>

                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;

