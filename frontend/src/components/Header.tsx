import React, { useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'

import Authentication from './Authentication'

type Props = {}

const Header = (props: Props) => {
    const [searchInput, setSearchInput] = useState<string>('')
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [toggelDropDown ,setToggleDropDown] = useState<boolean>(false)
    const {handleAuth} = useAuth()
    // Handlers
 
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const {userData} = useAuth()

    const handleToggleDropdown = ()=>{
        setToggleDropDown(prev=>!prev)
    }

    const handleLogout=()=>{
        localStorage.removeItem('token')
        handleToggleDropdown()
        handleAuth(null)
    }
  return (
    <div className='w-screen h-20 bg-white flex items-center justify-center fixed top-0 left-0 z-100 shadow-md'>
        <div className='container relative mx-auto flex items-center justify-between h-full gap-5 p-4'>
            <h1 className='md:text-2xl text-shadow-stone-800 flex-1'>ConcertZ/Berlin</h1>
            <div className='border px-5 border-gray-400 h-full w-full flex justify-between items-center rounded-2xl flex-7'>
                <input className='h-full w-full md:text-xl focus:outline-none ' type='text' value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} placeholder='Search for concerts around berlin'></input>
                     <span className="material-symbols-outlined text-gray-400" style={{ fontSize: '32px' }}>
                        search
                    </span>
            </div>
            <div className='h-full flex items-center justify-center flex-1'>
                {userData?
                    <div className='flex justify-between flex-col'>
                        <span className="material-symbols-outlined text-shadow-stone-800 " style={{ fontSize: '36px' }} onClick={handleToggleDropdown}>
                            account_circle
                        </span>
                        {toggelDropDown && <div className='absolute top-20 right-0 bg-gray-100 sm:min-h-screen md:min-h-10 w-full md:w-80 flex flex-col gap-4 shadow-md'>
                            <div className='text-xl w-full hover:bg-gray-300 p-4 flex items-center gap-2'>
                                <span className="material-symbols-outlined">
                                    manage_accounts
                                </span>
                                Profile</div>
                            <div onClick={handleLogout} className='text-xl w-full hover:bg-gray-300 p-4 flex items-center gap-2' >
                                <span className="material-symbols-outlined">
                                    logout
                                </span>
                                Logout</div>
                        </div>}
                       
                    </div>
                      
                        
                        :
                        <button className='bg-[#DF1827] h-full w-full text-white sm:text-xs md:text-lg font-bold rounded-2xl p-1' onClick={openModal}>SignIn</button>
                }
            </div>
            <Authentication isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal}/>
        </div>
    </div>
  )
}

export default Header