import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

import Authentication from './Authentication'
import Search from './Search'
import { useNavigate } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'


const Header = () => {
    const queryClient = useQueryClient()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [toggelDropDown ,setToggleDropDown] = useState<boolean>(false)
    const {userData,handleAuth} = useAuth()
    const navigation = useNavigate()
    // Handlers
 
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleToggleDropdown = ()=>{
        setToggleDropDown(prev=>!prev)
    }

    const handleLogout=()=>{
        localStorage.removeItem('token')
        handleToggleDropdown()
        queryClient.clear()
        handleAuth(null)
    }

    const handleBookingHistory =()=>{
        handleToggleDropdown()
        navigation('/booking-history')
    }
    
  return (
    <div className='flex-1 w-screen h-20 bg-white flex items-center justify-center fixed top-0 left-0 z-100 shadow-md'>
        <div className='container relative mx-auto flex items-center justify-between h-full gap-5 p-4'>
            <h1 className='md:text-2xl text-shadow-stone-800 flex-1 cursor-pointer' onClick={()=>navigation('/')}>ConcertZ/Berlin</h1>
            <Search/>
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
                            <div onClick={handleBookingHistory} className='text-xl w-full hover:bg-gray-300 p-4 flex items-center gap-2'>
                                <span className="material-symbols-outlined">
                                    archive
                                </span>
                                Booking History</div>
                            <div onClick={handleLogout} className='text-xl w-full hover:bg-gray-300 p-4 flex items-center gap-2' >
                                <span className="material-symbols-outlined">
                                    logout
                                </span>
                                Logout</div>
                        </div>}
                       
                    </div>
                      
                        
                        :
                        <button className='bg-brand h-full w-full text-white text-xs md:text-lg font-bold rounded-2xl px-3 md:px-4' onClick={openModal}>SignIn</button>
                }
            </div>
            <Authentication isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal}/>
        </div>
    </div>
  )
}

export default Header