import { useState } from 'react'
import Modal from './Modal'
import Login from './Login';
import Register from './Register';

type Props = {
  isModalOpen:boolean,
  openModal:()=>void,
  closeModal:()=>void
}

const Authentication = ({isModalOpen,closeModal}: Props) => {
    const [toggle,setToggle] = useState<boolean>(false)
    
    const FormComponent = toggle? Register:Login
    
    const formKey = toggle ? 'register' : 'login';
    const title = toggle ? 'Register' : 'Login';

    const closeModalHandler=()=>{
        setToggle(false)
        closeModal()
    }
    
  return (

                <Modal 
                    isOpen={isModalOpen} 
                    onClose={closeModalHandler}
                    title={title}
                >
                    {/* Content passed as children */}
                    <div className='w-full flex flex-col items-center gap-5'>
                        <div key={formKey} className='w-full'>
                            <FormComponent closeModal={closeModalHandler}/>
                         </div>
                         {toggle?<div>Already Registered? <span className='text-blue-700' onClick={()=>setToggle(!toggle)}>SignIn here</span></div>:
                         <div>Not Registered? <span className='text-blue-700' onClick={()=>setToggle(!toggle)}>SignUp here</span></div>}
                    </div>
                   
                   
                    
                </Modal>

  )
}

export default Authentication