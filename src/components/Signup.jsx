import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Login from './Login'
import { useForm } from "react-hook-form"
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Signup() {
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/"

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async(data) => {
        const userInfo = {
            Fullname:data.Fullname,
            Email:data.Email,
            Password:data.Password,
        }
        await axios.post('https://rebuilding-e-book-backend.onrender.com/signup', userInfo)
        .then((res)=>{
            console.log(res.data);
            if(res.data){
                toast.success("Signup successfull")
                navigate(from , {replace:true})
            }
            localStorage.setItem("Users",JSON.stringify(res.data.user))
        }).catch((err)=>{
            if(err.response){
                console.log(err);
                toast.error("Error: " + err.response.data.message)
            }
        })
    }

    return (
        <>
            <div className='flex h-screen items-center justify-center'>
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <div className='w-[600px]'>
                    <div className='modal-box'>
                        <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <Link to='/' className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>

                            <h3 className="font-bold text-lg">Signup</h3>
                            <div className='mt-4 space-y-2'>
                                <span>Name</span>
                                <br />
                                <input type="text" placeholder='Enter your name' className='w-80 px-3 py-1 border rounded-md outline-none' {...register("Fullname", { required: true })} />
                                <br />
                                {errors.Fullname && <span className='text-sm text-red-500'>This field is required</span>}
                            </div>
                            <div className='mt-4 space-y-2'>
                                <span>Email</span>
                                <br />
                                <input type="email" placeholder='Enter your email' className='w-80 px-3 py-1 border rounded-md outline-none' {...register("Email", { required: true })} />
                                <br />
                                {errors.Email && <span className='text-sm text-red-500'>This field is required</span>}
                            </div>
                            <div className='mt-4 space-y-2'>
                                <span>Password</span>
                                <br />
                                <input type="password" placeholder='Enter your password' className='w-80 px-3 py-1 border rounded-md outline-none' {...register("Password", { required: true })} />
                                <br />
                                {errors.Password && <span className='text-sm text-red-500'>This field is required</span>}
                            </div>
                            <div className='flex justify-between mt-4'>
                                <button type='submit' className='bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200'>Signup</button>
                                <p>Have Account? <button className='underline text-blue-500 cursor-pointer' onClick={() => document.getElementById("my_modal_3").showModal()}>Login</button><Login /></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup