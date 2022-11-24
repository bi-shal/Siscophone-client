import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { useForm } from "react-hook-form";
import { AuthContext } from '../../context/AuthProvider';

const Signup = () => {
const {createUser,user} = useContext(AuthContext)
console.log(user)

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [data,setData] = useState('')
    // console.log(data);


    const onSubmit = data => {
        setData(data)
        createUser(data.email, data.password)
        .then(result => {
            const user = result.user;
            console.log(user);
        }).catch(error => console.log(error));
    };


    return (
        <div className='py-10'>
            <div className="w-full mx-auto max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-900 dark:text-gray-100">
	<h1 className="text-2xl font-bold text-center">Login</h1>
	<form
    onSubmit={handleSubmit(onSubmit)}
     className="space-y-6 ng-untouched ng-pristine ng-valid">
    <div className="space-y-1 text-sm">
			<label  className="block dark:text-gray-400">Name</label>
			<input
             {...register("name", { required: true })}
            type="text" name="name"  placeholder="Username" className=" border w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
			<div data-lastpass-icon-root="true" ></div>
		</div>


		<div className="space-y-1 text-sm">
			<label  className="block dark:text-gray-400">Email</label>
			<input
             {...register("email", { required: "Email Address is required" })}
            type="text" name="email"  placeholder="email" className=" border w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
			<div data-lastpass-icon-root="true" ></div>
		</div>
        {errors.email && <p className='text-red-800' role="alert">{errors.email?.message}</p>}
		<div className="space-y-1 text-sm">
			<label  className="block dark:text-gray-400">Password</label>
			<input
             {...register("password", { required: 'password is required' })}
            type="password" name="password" placeholder="Password" className="border w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
			<div className="flex justify-end text-xs dark:text-gray-400">
				<a  href="fwe">Forgot Password?</a>
			</div>
            
            {errors.password && <p className='text-red-800' role="alert">{errors.password?.message}</p>}
			<div data-lastpass-icon-root="true" ></div>
            
		</div>
        
		<button className="block w-full p-3 text-center rounded-sm dark:text-gray-900 dark:bg-violet-400">Sign up</button>
	</form>
	
	
    
	<p className=" text-xl text-center sm:px-6 dark:text-gray-400"> Have an account?
		<Link to='/login' className="underline dark:text-gray-100">  Login</Link>
	</p>
</div>
        </div>
    );
};

export default Signup;