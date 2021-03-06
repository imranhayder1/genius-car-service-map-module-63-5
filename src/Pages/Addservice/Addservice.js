import React from 'react';
import { useForm } from "react-hook-form";

const Addservice = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        console.log(data);

        const url = `https://secure-sands-66346.herokuapp.com/service/`;
        fetch(url, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }
    return (
        <div className='w-50 mx-auto'>
            <h3>please add service</h3>
            <form className='d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
                <input className='mb-3' placeholder='Name' {...register("name", { required: true, maxLength: 20 })} />
                <textarea className='mb-3' placeholder='Description' {...register("description")} />
                <input className='mb-3' placeholder='Price' type="number" {...register("price")} />
                <input className='mb-3' placeholder='Photo' type="text" {...register("img")} />
                <input className='mb-3' placeholder='' type="submit" value="Add Service" />
            </form>
        </div>
    );
};

export default Addservice;