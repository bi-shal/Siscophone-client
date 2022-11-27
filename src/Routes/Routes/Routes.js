import { createBrowserRouter } from "react-router-dom";
import Blog from "../../component/Blog/Blog";
import BuyNow from "../../component/BuyNow/BuyNow";
import AddProduct from "../../component/DashBoard/AddProduct/AddProduct";
import Myorder from "../../component/DashBoard/Myorder/Myorder";
import MyProduct from "../../component/DashBoard/MyProduct/MyProduct";
import Home from "../../component/Home/Home";
import Login from "../../component/Login/Login";
import Signup from "../../component/Signup/Signup";
import DashBoardLayout from "../../Layout/DahBoardLayout/DashBoardLayout";
import Main from "../../Layout/Layout/Main";
import Error from "../../Share/Error/Error";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

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
            },
            {
                path:'/buynow',
                element:<BuyNow></BuyNow>
                
            },
            
        ]

    },

    {
        path:'*',
        element:<Error></Error>
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
        children:[
           { 
            path:'/dashboard/myorders',
            element:<Myorder></Myorder>
           },
           {
            path:'/dashboard/addproducts',
            element:<AddProduct></AddProduct>
           },
           {
            path:'/dashboard/myProduct',
            element:<MyProduct></MyProduct>
           }

        ]
    }
])