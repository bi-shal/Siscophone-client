import { createBrowserRouter } from "react-router-dom";
import Blog from "../../component/Blog/Blog";
import BuyNow from "../../component/BuyNow/BuyNow";
import AddProduct from "../../component/DashBoard/AddProduct/AddProduct";
import Myorder from "../../component/DashBoard/Myorder/Myorder";
import MyProduct from "../../component/DashBoard/MyProduct/MyProduct";
import Category from "../../component/Home/Category";
import Categorycards from "../../component/Home/Categorycards";
import Home from "../../component/Home/Home";
import Login from "../../component/Login/Login";
import Signup from "../../component/Signup/Signup";
import DashBoardLayout from "../../Layout/DahBoardLayout/DashBoardLayout";
import Main from "../../Layout/Layout/Main";
import Error from "../../Share/Error/Error";
import PayNow from "../../Share/PayNow/PayNow";
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
                element:<PrivateRoute><BuyNow></BuyNow></PrivateRoute>
                
            },
            { 
                path:'/pay',
                element:<PayNow></PayNow>
               },
            {
                path:'/categoryForm/:category',
                element:<Category></Category>,
                loader:({params}) => fetch(`https://assignment-12-server-mocha.vercel.app/categoryForm/${params.category}`)
            }
            
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
                path:'/dashboard',
                element:<BuyNow></BuyNow>
            },
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