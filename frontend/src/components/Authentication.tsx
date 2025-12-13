import { useEffect, useState } from 'react'
import Modal from './Modal'
import Login from './Login';
import Register from './Register';

type Props = {
  isModalOpen:boolean,
  openModal:()=>void,
  closeModal:()=>void
}

const Authentication = ({isModalOpen,openModal,closeModal}: Props) => {
    const [toggle,setToggle] = useState<boolean>(false)
    useEffect(()=>{
        setToggle(false)
    },[openModal])
  return (

                <Modal 
                    isOpen={isModalOpen} 
                    onClose={closeModal}
                    title="Login"
                >
                    {/* Content passed as children */}
                    <div className='w-full flex flex-col items-center gap-5'>
                         {!toggle?<Login closeModal={closeModal}/>:<Register closeModal={closeModal}/>}
                         {toggle?<div>Already Registered? <span className='text-blue-700' onClick={()=>setToggle(!toggle)}>SignIn here</span></div>:
                         <div>Not Registered? <span className='text-blue-700' onClick={()=>setToggle(!toggle)}>SignUp here</span></div>}
                    </div>
                   
                   
                    
                </Modal>

  )
}

export default Authentication