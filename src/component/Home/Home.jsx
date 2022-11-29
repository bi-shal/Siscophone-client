import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../assets/img/gsmarena_001.jpg'
import img2 from '../../assets/img/Samsung-online mobile shop in bd.jpg'
import img3 from '../../assets/img/Symphony-Z47-teaser.jpg'
import { AuthContext } from '../../context/AuthProvider';
import Card from './Card';
import CategoryHome from './CategoryHome';


const Home = () => {
  const {user} = useContext(AuthContext)
const [category,setCategory] = useState([]);
// console.log(category)
const [addsCard,setAddsCard] = useState([]);
// console.log(typeof(addsCard))

useEffect(()=>{
  axios.get(`http://localhost:5000/addCard`)
  .then(res => {
      setAddsCard(res?.data)
      // setToken(accessToken)
  })

},[user?.email])


useEffect(()=>{
  fetch('http://localhost:5000/category')
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

 {/* card */}
 {
  addsCard.length > 0 ?
  <div>
<h1 className='text-5xl text-cyan-500 font-bold text-center my-5'>ADDVERTISE PRODUCT</h1>
  <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      
  
      {
          addsCard.map(cards => <Card
              key={cards._id}
              cards={cards}
          ></Card>)
      }
    </div>
  </div>
:

<div>
<h1 className='text-5xl text-cyan-500 font-bold text-center my-5'>ADDVERTISE PRODUCT</h1>
</div>

 }

 


<div className='my-16'>
<div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
    
    {
  category.map((cat,id) =><CategoryHome
  key={id}
  cat={cat}
  ></CategoryHome> )
}
</div>
</div>



        </div>
    );
};

export default Home;