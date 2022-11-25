import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import Navber from '../../Share/Navber/Navber';
// import useAdmin from '../hooks/useAdmin';




const DashBoardLayout = () => {
    const { user } = useContext(AuthContext);
    // const [isAdmin] = useAdmin(user?.email)
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