import React, { useRef, useState } from 'react'
import Modal from './Modal'
import type { UserData } from '../types';
import { useAuth } from '../context/AuthContext';
import api from '../utils/axiosConfig';

type Props = {
  isModalOpen:boolean,
  openModal:()=>void,
  closeModal:()=>void
}

const Login = ({isModalOpen,openModal,closeModal}: Props) => {
   
    const [toggle,setToggle] = useState<boolean>(false)
    const loginInputRef = useRef<HTMLInputElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)
    const [messsage,setMessage] = useState<boolean>(false)
    const {handleAuth}=useAuth()
    

        const login=()=>{
            if(loginInputRef.current && passwordInputRef.current){
                if(!loginInputRef.current.value || !passwordInputRef.current.value){
                    setMessage(true)
                }else{
                    validate(loginInputRef.current.value,passwordInputRef.current.value)
                }
            }else{
                console.error("Failed to read inputs")
            }    
        }
    
        const validate = async(email:string,password:string) =>{
            const data = {
                email:email,
                password:password
            }
          try{
            const response = await api.post('/auth/login',data)
            handleAuth(response.data as UserData)
            closeModal()
          }catch(error){
            console.error('Failed to Fetch api' +error)
          }
        }

  return (
                <Modal 
                    isOpen={isModalOpen} 
                    onClose={closeModal}
                    title="Login"
                >
                    {/* Content passed as children */}
                    <div className='w-full flex flex-col justify-center gap-5'>
                    <input type='email' ref={loginInputRef} className='border border-gray-400 text-xl p-4' placeholder='Enter Email here...'></input>
                    <input type='password' ref={passwordInputRef} className='border border-gray-400 text-xl p-4' placeholder='Enter Password here...'></input>
                     <div className='w-full flex gap-5'>
                        <button 
                            onClick={login}
                            className="mt-4 bg-[#DF1827] text-white px-3 py-3 rounded flex-1 hover:bg-red-400"
                            >
                            Login
                        </button>
                        <button 
                            onClick={login}
                            className="mt-4 border border-gray-400 text-gray-400px-3 py-3 rounded flex-1 hover:bg-gray-200"
                            >
                            Register
                        </button>
                     </div>
                    
                    </div>
                    {messsage && <div className='mt-4 text-md text-red-700'>"Please enter valid emailId and password to proceed"</div>}
                </Modal>
  )
}

export default Login