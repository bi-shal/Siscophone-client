import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import  toast  from 'react-hot-toast';

const BookModal = ({ order, setOrder }) => {
    // console.log(order);
    // console.log(order.productImage);
    const {user} = useContext(AuthContext)
    const handleBooking = (event) =>{
        event.preventDefault();
        // console.log(event)
        const form = event.target;
        const location= form.location.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const orders = {
            user: name,
            location,
            email,
            phone,
            product: order.name,
            price: order.salePrice,
            sellerEmail: order.email,
            productImage:order.productImage
            
        }
        // console.log(orders);

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


    return (
        <div>
            <>
            <input type="checkbox" id="bookModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="bookModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{order.name}</h3>
                    <h3 className="text-lg font-bold">Price: {order.price}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                        <input type="text" name='location'  placeholder='Your Location' className="input w-full input-bordered " />
                        <input name="name" type="text" defaultValue={user?.displayName} disabled placeholder="Your Name" className="input w-full input-bordered" />
                        <input name="email" type="email" defaultValue={user?.email} disabled placeholder="Email Address" className="input w-full input-bordered" />
                        <input name="phone" type="text" placeholder="Phone Number" className="input w-full input-bordered" />
                        <br />
                        <input className='btn btn-success w-full' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
        </div>
    );
};

export default BookModal;



// { order, setOrder }