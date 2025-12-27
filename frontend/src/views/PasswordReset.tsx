import React, { useRef, useState } from 'react'
import api from '../utils/axiosConfig'
import z from 'zod'
import axios from 'axios'

const PasswordReset = () => {
    const [isValidated,setValidated] = useState(false)
    const [message,setMessage] = useState('')
    const emailRef = useRef<HTMLInputElement>(null)


    const handleValidation = async () => {
    const email = emailRef.current?.value;

    const isFormatValid = z.string().email().safeParse(email).success;
    if (!isFormatValid) {
        setMessage("Invalid email format")
        return
    }

    try {
        const { data } = await api.post(`/auth/validate-email`,{email:email});
        if (data.isValid) {
            setValidated(true);
            setMessage('')
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const message = error.response?.data?.message || "An error occurred";
            
            if (status === 404) {
                setMessage("No account found with this email.");
            } else {
                setMessage(message);
            }
        } else if (error instanceof Error) {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }
    }
};
  return (
     <div className="flex px-5 md:px-0 flex-col w-full h-full mt-5 items-center justify-center">
        <div className='w-full md:w-1/2 py-10 border-2 px-5 flex flex-col items-center gap-5'>
             <h1 className="text-2xl md:text-3xl font-bold font-mono py-5">
                Password Reset
            </h1>
                {!isValidated? <div className='w-full flex flex-col md:flex-row  gap-5'>
                                    <div className='flex flex-col gap-5 flex-1'>
                                        <span className='text-xl px-2 font-bold'>Email:</span>
                                        <input ref={emailRef}  name='email' className='border-2 rounded-2xl border-gray-400 text-xl p-4 w-full' placeholder='Enter your email'></input>
                                        <button onClick={handleValidation} className='bg-brand w-50 text-white text-xl p-3 rounded-2xl hover:opacity-75'>Validate</button>
                                    </div>   
                    </div>:<div className='w-full flex flex-col md:flex-row  gap-5'>
                                    <div className='flex flex-col gap-2 flex-1'>
                                        <span className='text-xl px-2'>New Password</span>
                                        <input  name='firstName' className='border-2 rounded-2xl border-gray-400 text-xl p-4 w-full' ></input>
                                    </div>
                                    <div className='flex flex-col gap-2 flex-1'>
                                        <span className='text-xl px-2'>Re enter new password</span>
                                        <input  name='lastName' className='border-2 rounded-2xl border-gray-400 text-xl p-4' ></input>
                                    </div>

                    </div>}
                   
            <div className='mt-4 text-lg text-red-700 text-center'>{message}</div>       
        </div>
    </div>
  )
}

export default PasswordReset