import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../context/AuthProvider';

const AddProduct = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    let time = new Date();
    let hour = time.getHours();
    if (hour > 12) {
        hour = hour - 12;
    }

    let minute = time.getMinutes();
    let date = time.getDate();
    let month = time.getMonth();
    let year = time.getFullYear();

    const handleProduct = (e) => {
        
        e.preventDefault();
        // console.log('click')
        const productName = e.target.product.value;
        const price = e.target.price.value;
        const useTime = e.target.useTime.value;
        const purchaseYear = e.target.purchaseYear.value;
        const purchase = e.target.purchase.value;
        const location = e.target.location.value;
        const phone = e.target.phone.value;
        const category = e.target.category.value;
        const quality = e.target.quality.value;
        const textarea = e.target.textarea.value;

        // console.log(price,useTime,purchaseYear,location,phone);

        toast.success('Wait for Submit');

        const image = e.target.productPhoto.files[0];
        // console.log(image);

        const formData = new FormData();
        
        formData.append('image', image);
        // console.log(formData)
        const url = `https://api.imgbb.com/1/upload?key=8f67f3230540ea07b6ddeb8e61ef9487`

        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((imageData) => {
                // console.log(imageData)
                const productImage = imageData.data.display_url;
                const productInfo = {
                    name: user?.displayName,
                    email: user?.email,
                    photo: user?.photoURL,
                    phone,
                    productName,
                    price,
                    useTime,
                    productImage,
                    purchaseYear,
                    purchase,
                    location,
                    category,
                    quality,
                    status: "available",
                    textarea,
                    date: `${date}/${month}/${year}`,
                    time: `${hour}:${minute}`,
                };
                // console.log(productInfo);
                fetch(`http://localhost:5000/products`, {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(productInfo),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        // console.log(data);
                        // toast.success('Product Submited successfully');
                        navigate('/dashboard/myProduct');
                    });
            });
    };
    

    return (
        <div className='bg-sky-300'>
        <section className="p-6  bg-base-100 rounded-md shadow-2xl mt-20 mb-10 md:mt-16">
            <h1 className="text-4xl text-center font-bold text-gray-800 capitalize">
                Add Product
            </h1>
            <form onSubmit={handleProduct}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="text-gray-800" >
                            Seller Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            defaultValue={user?.displayName}
                            readOnly
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-300 rounded-md  focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                    </div>
                    <div>
                        <label className="text-gray-800" >
                            Seller Email
                        </label>
                        <input
                            id="emailAddress"
                            type="email"
                            name="email"
                            defaultValue={user?.email}
                            readOnly
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                    </div>
                    <div>
                        <label className="text-gray-800" >
                            Product Name
                        </label>
                        <input
                            id="product"
                            type="text"
                            name="product"
                            placeholder="Product Name"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                    </div>
                    <div>
                        <label className="text-gray-800" >
                            Sells Price
                        </label>
                        <input
                            id="price"
                            type="number"
                            name="price"
                            placeholder="Price"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                    </div>
                    <div>
                        <label className="text-gray-800" >
                            Used Time
                        </label>
                        <input
                            id="useTime"
                            type="text"
                            name="useTime"
                            placeholder="Used time"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                    </div>
                    <div>
                        <label className="text-gray-800" >
                            Purchase year
                        </label>
                        <input
                            id="purchaseYear"
                            type="date"
                            name="purchaseYear"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                    </div>
                    <div>
                        <label className="text-gray-800" >
                            Original Price
                        </label>
                        <input
                            id="purchase"
                            type="number"
                            name="purchase"
                            placeholder="Original price"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                    </div>
                    <div>
                        <label className="text-gray-800" >
                            Location
                        </label>
                        <input
                            id="location"
                            type="text"
                            name="location"
                            placeholder="Location"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                    </div>
                    <div>
                        <label className="text-gray-800">
                            Seller Phone Number
                        </label>
                        <input
                            id="phone"
                            type="number"
                            name="phone"
                            placeholder="Seller Phone Number"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                    </div>
                    <div>
                        <label className="text-gray-800" >
                            Product Quality
                        </label>
                        <select
                            name="quality"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:border-blue-500  focus:outline-none focus:ring">
                            <option >Excellent</option>
                            <option>Good</option>
                            <option>Fair</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-gray-800" >
                            Category
                        </label>
                        <select
                            name="category"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:border-blue-500  focus:outline-none focus:ring">
                            <option >Samsung</option>
                            <option>Xaiomi</option>
                            <option>Symphony</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-gray-800" >
                            Photo
                        </label>
                        <input
                            id="photo"
                            type="file"
                            name="productPhoto"
                            className="block w-full px-4 py-1.5 mt-2 text-gray-700 bg-white border rounded-md     border-gray-600 focus:border-blue-400   focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                </div>
                <div className="mt-5">
                    <label className="text-gray-800" >
                        Text Area
                    </label>
                    <textarea
                        id="textarea"
                        type="textarea"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md   focus:border-blue-500 focus:outline-none focus:ring"></textarea>
                </div>
                <div className="flex justify-center mt-6">
                    <button
                        type="submit"
                        className="px-10 py-3 leading-5 text-white transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-900 focus:outline-none focus:bg-gray-600">
                        Save
                    </button>
                </div>
            </form>
        </section>
    </div>
    );
};

export default AddProduct;
