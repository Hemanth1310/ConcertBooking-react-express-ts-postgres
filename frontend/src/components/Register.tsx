import React, { useState} from 'react'

type Props = {
    closeModal:()=>void
}

const Register = (props: Props) => {
    const [flag,setflag] = useState<boolean>(false)
    

    const registration=(e:React.FormEvent)=>{
        e.preventDefault()
        setflag(false)
        const formData = new FormData(e.target as HTMLFormElement)
        const payload = Object.fromEntries(formData);
        
        for(let [key,value] of Object.entries(payload) ){
            if(!value){
                setflag(true)
            }
        }

    }

  return (
    <form className='w-full flex flex-col justify-center gap-5' onSubmit={registration}>
        <input type='text' name='firstname' className='border border-gray-400 text-xl p-4' placeholder='Enter First Name here...'></input>
        <input type='text' name='lastname' className='border border-gray-400 text-xl p-4' placeholder='Enter Lastname here...'></input>
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
                    {flag && <div className='mt-4 text-md text-red-700'>"One or More fields empty"</div>}
    </form>
  )
}

export default Register