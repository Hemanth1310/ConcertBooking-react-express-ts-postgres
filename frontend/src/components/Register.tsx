import React, { useState} from 'react'
import type { UserRegistrationData } from '../types'
import api from '../utils/axiosConfig'

type Props = {
    closeModal:()=>void
}

const Register = (props: Props) => {
    const [flag,setflag] = useState<boolean>(false)
    const [formError,setFormError] = useState<string>('')

    const handleFormInput=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setflag(false)
        const formData = new FormData(e.target as HTMLFormElement)
        const payload  = Object.fromEntries(formData)

        for(let value of Object.values(payload) ){
            if(!value){
                setflag(true)
                setFormError('One or more fields empty. Please fill before continuing!!')
            }
            console.log(value)
        }

        if(payload.password===payload.repassword){
            const {repassword,...rest} =payload
            Registration(rest as UserRegistrationData)
            
        }else{
            setflag(true)
            setFormError('Paswords mismatch: make sure both the passwords are same')
        }

    }

    const Registration = async(userRegData:UserRegistrationData)=>{
        try{
            const response = await api.post('/auth/register',userRegData)
            console.log(response.data.messsage)
        }catch(error){
            console.error('Failed to Fetch api' +error)
            setFormError('REgistration failed. Please try again later!!')
        }
        
    }


  return (
    <form className='w-full flex flex-col justify-center gap-5' onSubmit={handleFormInput}>
        <input type='text' name='firstName' className='border border-gray-400 text-xl p-4' placeholder='Enter First Name here...'></input>
        <input type='text' name='lastName' className='border border-gray-400 text-xl p-4' placeholder='Enter Lastname here...'></input>
        <input type='email' name='email' className='border border-gray-400 text-xl p-4' placeholder='Enter Email here...'></input>
        <input type='password'name='password' className='border border-gray-400 text-xl p-4' placeholder='Enter Password here...'></input>
        <input type='password'name='repassword' className='border border-gray-400 text-xl p-4' placeholder='Enter Password here...'></input>
                     
                     <div className='w-full flex gap-5'>
                       
                        <button 
                           type='submit'
                            className="mt-4 border border-gray-400 text-gray-400px-3 py-3 rounded flex-1 hover:bg-gray-200"
                        >
                            Register
                        </button>
                     </div>
                    {flag && <div className='mt-4 text-md text-red-700'>{formError}</div>}
    </form>
  )
}

export default Register