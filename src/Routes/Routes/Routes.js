import { createBrowserRouter } from "react-router-dom";
import Blog from "../../component/Blog/Blog";
import AddProduct from "../../component/DashBoard/AddProduct/AddProduct";
import Dashboard from "../../component/DashBoard/Dashboard/Dashboard";
import Myorder from "../../component/DashBoard/Myorder/Myorder";
import Home from "../../component/Home/Home";
import Login from "../../component/Login/Login";
import Signup from "../../component/Signup/Signup";
import DashBoardLayout from "../../Layout/DahBoardLayout/DashBoardLayout";
import Main from "../../Layout/Layout/Main";
import Error from "../../Share/Error/Error";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/blog',
                element:<Blog></Blog>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/signup',
                element:<Signup></Signup>
            }
        ]

    },

    {
        path:'*',
        element:<Error></Error>
    },
    {
        path:'/dashboard',
        element:<DashBoardLayout></DashBoardLayout>,
        children:[
           { 
            path:'/dashboard/myorders',
            element:<Myorder></Myorder>
           },
           {
            path:'/dashboard/addproducts',
            element:<AddProduct></AddProduct>
           }

        ]
    }
])