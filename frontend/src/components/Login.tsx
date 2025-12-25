import { useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../utils/axiosConfig'
import { useNavigate } from 'react-router'

type Props = {
    closeModal:()=>void
}

const Login = ({closeModal}: Props) => {
    const loginInputRef = useRef<HTMLInputElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)
    const [messsage,setMessage] = useState<boolean>(false)
    const {handleAuth}=useAuth()
    const navigation = useNavigate()

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
            console.log('log'+JSON.stringify(response.data))
            localStorage.setItem('token',response.data.token)
            handleAuth(response.data.payload)
            closeModal()
          }catch(error){
            console.error('Failed to Fetch api' +error)
          }
        }

        const handleForgetPassword=()=>{
            closeModal()
            navigation('/forgot-password')
        }
        
  return (
     <div className='w-full flex flex-col justify-center gap-5'>
                    <input type='email' ref={loginInputRef} className='border border-gray-400 text-xl p-4' placeholder='Enter Email here...'></input>
                    <input type='password' ref={passwordInputRef} className='border border-gray-400 text-xl p-4' placeholder='Enter Password here...'></input>
                     <div className='w-full flex justify-end' onClick={handleForgetPassword}><span className='text-blue-700' >Forgot password?</span></div>
                      <button 
                            onClick={login}
                            className="mt-4 bg-brand text-white px-3 py-3 rounded flex-1 hover:bg-red-400"
                            >
                            Login
                        </button>
                    {messsage && <div className='mt-4 text-md text-red-700'>"Please enter valid emailId and password to proceed"</div>}
    </div>
  )
}

export default Login