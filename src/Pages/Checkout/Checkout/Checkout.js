import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useServiceDetails from '../../../hooks/useServiceDetails';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import axios from 'axios';
import { toast } from 'react-toastify';

const Checkout = () => {
    const { serviceId } = useParams();
    const [service] = useServiceDetails(serviceId);
    const [user] = useAuthState(auth);

    // const [user, setUser] = useState({
    //     name: 'Abdullah',
    //     email: 'abc@gmail.com',
    //     address: 'Khulna, Bangladesh',
    //     phone: '017111111111'

    // })

    // const handleAddress = e => {
    //     const { address, ...rest } = user;
    //     const newAddress = e.target.value;
    //     const newUser = { address: newAddress, ...rest }
    //     console.log(newUser);
    //     setUser(newUser)
    // }

    const handleorder = event => {
        event.preventDefault();
        const order = {
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            address: event.target.address.value,
            phone: event.target.number.value

        }
        axios.post('https://secure-sands-66346.herokuapp.com/order', order)
            .then(response => {
                console.log(response);
                if (response.data) {
                    toast('Order Is Booked!!!')
                    event.target.reset();
                }
            })
    }

    return (
        <div className='w-50 mx-auto'>
            <h2>Please Order: {service.name}</h2>
            <form onSubmit={handleorder}>
                <input className='mb-3' type="text" value={user?.displayName} name="name" placeholder='Name' required readOnly /> <br />
                <input className='mb-3' type="email" value={user?.email} name="email" placeholder='Email' required readOnly /> <br />
                <input className='mb-3' type="text" value={service.name} name="service" placeholder='Service' required readOnly /> <br />
                <input /* onChange={handleAddress} */ className='mb-3' type="text" name="address" placeholder='Address' required /> <br />
                <input className='mb-3' type="number" name="number" placeholder='Phone-Number' required /> <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Checkout;