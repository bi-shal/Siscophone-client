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