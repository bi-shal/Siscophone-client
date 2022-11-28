const express = require('express');
const cors = require('cors');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 7000;

// middleWares
app.use(cors());
app.use(express.json());

// Database Connection
const uri = process.env.DB_URI;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

async function run() {
    try {
        const catagoriesCollection = client
            .db('uselap-db')
            .collection('catagories');
        const usersCollection = client.db('uselap-db').collection('users');
        const productsCollection = client
            .db('uselap-db')
            .collection('products');
        const bookingsCollection = client
            .db('uselap-db')
            .collection('bookings');

        const paymentCollection = client.db('uselap-db').collection('payment');

        app.get('/jwt', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const user = await usersCollection.findOne(query);
            if (user) {
                const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, {
                    expiresIn: '1h',
                });
                return res.send({ accessToken: token });
            }
            res.status(403).send({ accessToken: '' });
        });

        app.get('/category', async (req, res) => {
            const result = await catagoriesCollection.find({}).toArray();
            res.send(result);
        });

        app.get('/products', async (req, res) => {
            const result = await productsCollection.find({}).toArray();
            res.send(result);
        });

        // ..............get category products...................

        app.get('/categories-data/:category', async (req, res) => {
            
            const category = req.params.category;
            const query = {
                $and: [{ category: category }, { status: 'available' }],
            };
            const result = await productsCollection.find(query).toArray();
            res.send(result);
            // console.log(result);
        });

        // check role
        app.get('/users/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const result = await usersCollection.findOne(query);
            res.send(result);
            // console.log(result)
        });

        app.get('/users', async (req, res) => {
            const result = await usersCollection.find({}).toArray();
            res.send(result);
        });

        app.post('/users', async (req, res) => {
            const user = req.body;
            const users = await usersCollection.insertOne(user);
            res.send(users);
        });

        app.post('/products', async (req, res) => {
            const product = req.body;
            const products = await productsCollection.insertOne(product);
            res.send(products);
        });

        app.get('/products/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const result = await productsCollection.find(query).toArray();
            res.send(result);
            // console.log(result);
        });

        app.post('/bookings', async (req, res) => {
            const product = req.body;
            const products = await bookingsCollection.insertOne(product);
            res.send(products);
        });

        app.get('/bookings/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            // console.log(query);
            const result = await bookingsCollection.find(query).toArray();
            res.send(result);
        });

        // payment ==================================
        app.get('/booking/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: ObjectId(id) };
            const booking = await bookingsCollection.findOne(query);
            res.send(booking);
        });

        app.post('/create-payment-intent', async (req, res) => {
            const payment = req.body;
            const price = payment.price;
            const amount = price * 100;

            const paymentIntent = await stripe.paymentIntents.create({
                currency: 'usd',
                amount: amount,
                payment_method_types: ['card'],
            });
            res.send({
                clientSecret: paymentIntent.client_secret,
            });
        });

        app.post('/payments', async (req, res) => {
            const payment = req.body;
            const result = await paymentCollection.insertOne(payment);
            const id = payment.bookingId;
            const filter = { _id: ObjectId(id) };
            const updatedDoc = {
                $set: {
                    paid: true,
                    transitionId: payment.transitionId,
                },
            };
            const updatedResult = await bookingsCollection.updateOne(
                filter,
                updatedDoc,
            );

            const productId = req.body.productId;
            const query = { _id: ObjectId(productId) };
            const updatedProduct = {
                $set: {
                    status: 'sold',
                    advertise: false,
                },
            };
            const updatedProductResult = await productsCollection.updateOne(
                query,
                updatedProduct,
            );

            res.send(result);
        });

        // ================
        app.delete('/bookings/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await bookingsCollection.deleteOne(query);
            res.send(result);
        });

        app.delete('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await productsCollection.deleteOne(query);
            res.send(result);
        });

        app.get('/buyers', async (req, res) => {
            const filter = { role: 'Buyer' };
            const result = await usersCollection.find(filter).toArray();
            res.send(result);
        });

        app.delete('/buyers/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            res.send(result);
        });
        app.get('/sellers', async (req, res) => {
            const filter = { role: 'Seller' };
            const result = await usersCollection.find(filter).toArray();
            res.send(result);
        });

        app.delete('/sellers/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            res.send(result);
        });

        app.get('/allProducts', async (req, res) => {
            const result = await productsCollection.find({}).toArray();
            res.send(result);
        });

        app.delete('/allProducts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await productsCollection.deleteOne(query);
            res.send(result);
        });

        console.log('Database Connected...');
    } finally {
    }
}

run().catch((err) => console.error(err));

app.get('/', (req, res) => {
    res.send('Server is running... in session');
});

app.listen(port, () => {
    console.log(Server is running...on ${port});
});


//boooooooooooooooooooooooooooooooooookkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';

const BookingModal = ({ order, setOrder }) => {
    const {user} = useContext(AuthContext)
    const handleBooking = (event) =>{
        event.preventDefault();
        console.log(event)
        const form = event.target;
        const location= form.location.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        // [3, 4, 5].map((value, i) => console.log(value))
        const orders = {
            user: name,
            location,
            email,
            phone,
            product: order.name,
            price: order.salePrice,
            sellerEmail: order.email
        }

        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(orders)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setOrder(null)
                    toast.success('Order confirmed');
                }
                else{
                    toast.error(data.message);
                }
            })

    }
    return (
        <>
            <input type="checkbox" id="bookModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="bookModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{order.name}</h3>
                    <h3 className="text-lg font-bold">Price: {order.salePrice}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                        <input type="text" name='location'  placeholder='Your Location' className="input w-full input-bordered " />
                        <input name="name" type="text" defaultValue={user?.displayName} disabled placeholder="Your Name" className="input w-full input-bordered" />
                        <input name="email" type="email" defaultValue={user?.email} disabled placeholder="Email Address" className="input w-full input-bordered" />
                        <input name="phone" type="text" placeholder="Phone Number" className="input w-full input-bordered" />
                        <br />
                        <input className='btn btn-accent w-full' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;

//boooooooooooooooooooooooooooooooooookkkkkkkkkkkkkkkkkkkkkkkkkkkkkk


//shooooooooooooooooppppppppppppppppppppppppppppppppppppppppppppp

import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from '../bookingModal/BookingModal';


const ProductsDetails = () => {
    const product = useLoaderData()
    const [order,setOrder] =useState()
    return (
        <div className='lg:w-2/4 mx-auto my-40'>
            <div  className='border w-96'>
            <figure><img className='w-96' src={product.image} alt="Shoes" /></figure>
            <div className='px-10 py-5'>
                <h1 className='text-4xl'>{product.name}</h1>
                <p>Orginal Price: {product.orginalPrice}</p>
                <p>Sale Price: {product.salePrice}</p>
                <p>Location: {product.location}</p>
                <p> Use: {product.use}</p>
                <p>Use Mils:  {product.useMils}</p>
                
                <label
                        htmlFor="bookModal"
                        className="btn btn-primary text-white"
                        onClick={() => setOrder(product)}
                    >Book Now</label>
            </div>
            </div>
            
            {
                order && <BookingModal
            
                order={order}
                setOrder={setOrder}
                >
    
                </BookingModal>
            }
        </div>
    );
};

export default ProductsDetails;
//shooooooooooooooooppppppppppppppppppppppppppppppppppppppppppppp



//signUp
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '../../contexts/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';

const SingUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser, googleLogIn } = useContext(AuthContext)
    const handleSignUp = (data) => {
        // setSignUPError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('User Created Successfully.')
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.role, data.name, data.email);
                    })
                    .catch(err => console.log(err));
            })
            .catch(error => {
                // console.log(error)
                toast.error(error.message)
                // setSignUPError(error.message)
            });
    }
    const provider = new GoogleAuthProvider()
    const handleGoogle = () => {
        googleLogIn(provider)
            .then(result => {
                const user = result.user
                console.log(user.displayName);
                const role = {role:"Buyer",}
                toast.success('google login Successfully.')
                saveUser(role.role,user.displayName, user.email);
            })
            .catch(error => {
                toast.error(error.message)
            });
    }
    const saveUser = (role,name, email) => {
        const user = {role, name, email };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
            })
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sing Up Now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(handleSignUp)}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Full Name</span>
                                    </label>
                                    <input type="text" {...register("name", {
                                        required: "Name is Required"
                                    })} placeholder="full name" className="input input-bordered" />
                                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" {...register("email", {
                                        required: true
                                    })} placeholder="email" className="input input-bordered" />
                                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                                </div>
                                <div className="form-control mt-4">
                                    <select {...register("role")} className="select select-bordered w-full max-w-xs">
                                        <option disabled selected>Select Your Role</option>
                                        <option>Buyer</option>
                                        <option>Seller</option>
                                    </select>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Password must be 6 characters long" },
                                        pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                                    })} placeholder="password" className="input input-bordered" />
                                    {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

                                    <label className="label">
                                        <Link className="label-text-alt link link-hover">Forgot password?</Link>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Sing Up</button>
                                </div>
                            </form>
                            <div className="form-control mt-6">
                                <button onClick={handleGoogle} className="btn btn-primary flex gap-9"><FcGoogle className='text-2xl'></FcGoogle><span>Google Sing Up</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingUp;
Write to Md Al Amin

//signUp




// const {createUser,user} = useContext(AuthContext)
// console.log(user)
// const [useOne,setUseOne] = useState([])
// console.log(useOne);
// const [token] = useToken(user)
// console.log(user)

    // const { register, handleSubmit,  formState: { errors } } = useForm();
    // const [dataa,setData] = useState({})
    // console.log(dataa)

    // const createUserr = {
    //     email:user?.email,
    //     role:useOne.role,
    // }
    // console.log(createUserr);
   
    // const onSubmit = data => {
        // setUseOne(data)
        // console.log(data,'click');

        // const createUserr = {
        //     email:user.email,
        //     role:data.role,
        // }
        // console.log(createUserr)
        // setData(createUserr)

        createUser(data.email, data.password)    
        .then(result => {
            const userss = result.user;
            // console.log(user);
            // toast('User Created Successfully.')
        }).catch(error => console.log(error));

    };

   // useEffect(()=>{

    //     fetch(`http://localhost:5000/usersCreate`, {
    //         method:'POST',
    //         headers:{
    //             'content-type' : 'application/json',
    //         },
    //         body:JSON.stringify(createUserr)
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data)
    //         // setUseOne(data)
    //     })
    // .catch(err => console.error(err));

    // },[]);











    const BookModal = ({ order, setOrder }) => {
        console.log(order);
        const {user} = useContext(AuthContext)
        const handleBooking = (event) =>{
            event.preventDefault();
            console.log(event)
            const form = event.target;
            const location= form.location.value;
            const name = form.name.value;
            const email = form.email.value;
            const phone = form.phone.value;
            // [3, 4, 5].map((value, i) => console.log(value))
            const orders = {
                user: name,
                location,
                email,
                phone,
                order
            }
    
            fetch('http://localhost:5000/bookModal', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(orders)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.acknowledged) {
                        setOrder(null)
                        toast.success('Order confirmed');
                    }
                    else{
                        toast.error(data.message);
                    }
                })
    
        }
    













import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../assets/img/gsmarena_001.jpg'
import img2 from '../../assets/img/Samsung-online mobile shop in bd.jpg'
import img3 from '../../assets/img/Symphony-Z47-teaser.jpg'
import { AuthContext } from '../../context/AuthProvider';

import Category from './Category';

const Home = () => {
  const {user} = useContext(AuthContext)
const [category,setCategory] = useState([]);
const [addsCard,setAddsCard] = useState([]);
console.log(addsCard)

useEffect(()=>{
  axios.get(`http://localhost:5000/addCard`)
  .then(res => {
      // console.log(res?.data);
      setAddsCard(res?.data)
      // setToken(accessToken)
  })

},[user?.email])





useEffect(()=>{
  fetch('categoryData.json')
  .then(res => res.json())
  .then(data => {
    setCategory(data)
  })
  .catch(error => console.log(error))

},[user])

    return (
        <div>
     <div className="carousel w-full ">
  <div id="slide1" className="carousel-item relative w-full">
    <img src={img1} alt='' className="w-full h-[80vh]" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide4" className="btn btn-circle">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide2" className="carousel-item relative w-full">
    <img src={img2} alt='' className="w-full h-[80vh]" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle">❮</a> 
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide3" className="carousel-item relative w-full">
    <img src={img3} alt='' className="w-full h-[80vh]" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a> 
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
  </div> 
  
            </div>


  {/* 50% of */}
<div className="p-6 py-12 dark:bg-violet-400 dark:text-gray-900 md:p-20">
	<div className="container mx-auto">
		<div className="flex flex-col lg:flex-row items-center justify-between">
			<h2 className="text-center text-6xl tracking-tighter font-bold">Up to
				<span className="">50% Off </span>
			</h2>
			<div className="space-x-2 text-center py-2 lg:py-0">
				<span>Plus free shipping! Use code:</span>
				<span className="font-bold text-lg">#9999</span>
			</div>
			<Link to='/'  rel="noreferrer noopener" className="px-5 mt-4 lg:mt-0 py-3 rounded-md border block dark:bg-gray-50 dark:text-gray-900 dark:border-gray-400">Shop Now</Link>
		</div>
	</div>
</div>
  {/* 50% of */}


  {/* category */}



  <div className="flex items-center -mx-4 space-x-10 overflow-x-auto overflow-y-hidden sm:justify-center flex-nowrap dark:bg-gray-800 dark:text-gray-100 py-20 my-10 ">
    <h1 className='text-6xl text-violet-400'> Category</h1>
    {
  category.map((cat,id) =><Category
  key={id}
  cat={cat}
  ></Category> )
}
</div>

        </div>
    );
};

export default Home;





















import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';

const BookingModal = ({ order, setOrder }) => {
    const {user} = useContext(AuthContext)
    const handleBooking = (event) =>{
        event.preventDefault();
        console.log(event)
        const form = event.target;
        const location= form.location.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        // [3, 4, 5].map((value, i) => console.log(value))
        const orders = {
            user: name,
            location,
            email,
            phone,
            product: order.name,
            price: order.salePrice,
            sellerEmail: order.email
        }

        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(orders)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setOrder(null)
                    toast.success('Order confirmed');
                }
                else{
                    toast.error(data.message);
                }
            })

    }
    return (
        <>
            <input type="checkbox" id="bookModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="bookModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{order.name}</h3>
                    <h3 className="text-lg font-bold">Price: {order.salePrice}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                        <input type="text" name='location'  placeholder='Your Location' className="input w-full input-bordered " />
                        <input name="name" type="text" defaultValue={user?.displayName} disabled placeholder="Your Name" className="input w-full input-bordered" />
                        <input name="email" type="email" defaultValue={user?.email} disabled placeholder="Email Address" className="input w-full input-bordered" />
                        <input name="phone" type="text" placeholder="Phone Number" className="input w-full input-bordered" />
                        <br />
                        <input className='btn btn-accent w-full' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;









//category
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../Shared/Loader/Loader';

const Catagory = () => {
    const [loading,setloading] = useState(true)
    const { data: catagory = [], } = useQuery({
        queryKey: ['catagory'],
        queryFn: async () => {
            const res = await fetch('https://assignment-12-server-three.vercel.app/catagory');
            const data = await res.json();
            if(data){
                setloading(false)
            }
            return data;
        }
    });
   
    if(loading){
        <Loader></Loader>
    }
    return (
        
        <div className='my-10'>
           <h1 className='text-4xl font-bold mb-10 text-center'>Catagory</h1>
           <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 w-2/4 gap-6 mx-auto">
           {

            catagory.map((cat)=><>
            <Link to={`catagory/${cat._id}`}><button className="btn btn-wide">{cat.catagory}</button></Link>
            
            </>)
            
           }
           </div>
           
        </div>
    );
    
};

export default Catagory;
//category
