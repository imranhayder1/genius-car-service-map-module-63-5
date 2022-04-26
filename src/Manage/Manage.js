import React from 'react';
import useService from '../hooks/useService';

const Manage = () => {
    const [services, setServices] = useService();

    const handleDelete = (id) => {
        const proced = window.confirm('Are you sure?');
        if (proced) {
            const url = `https://secure-sands-66346.herokuapp.com/service/${id}`;
            fetch(url, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);

                    const remaining = services.filter(service => service._id !== id);
                    setServices(remaining);
                })
        }

    }
    return (
        <div className='w-50 mx-auto'>
            <h3>user manage here</h3>
            {
                services.map(service =>
                    <div key={service._id}>
                        <h5>{service.name} <button onClick={() => handleDelete(service._id)}>X</button></h5>
                    </div>)
            }
        </div>
    );
};

export default Manage;