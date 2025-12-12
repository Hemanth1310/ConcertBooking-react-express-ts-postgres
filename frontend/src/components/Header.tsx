import React, { useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Modal from './Modal'
import api from '../utils/axiosConfig'
import type { UserData } from '../types'
import Login from './Login'

type Props = {}

const Header = (props: Props) => {
    const [searchInput, setSearchInput] = useState<string>('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Handlers
 
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const {userData} = useAuth()
  return (
    <div className='w-screen h-[80px] bg-white flex items-center justify-center fixed top-0 left-0 z-10 shadow-md'>
        <div className='container mx-auto flex items-center justify-between h-full gap-5 p-4'>
            <h1 className='md:text-2xl text-shadow-stone-800 flex-1'>ConcertZ/Berlin</h1>
            <div className='border px-5 border-gray-400 h-full w-full flex justify-between items-center rounded-2xl flex-7'>
                <input className='h-full w-full md:text-xl focus:outline-none ' type='text' value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} placeholder='Search for concerts around berlin'></input>
                     <span className="material-symbols-outlined text-gray-400" style={{ fontSize: '32px' }}>
                        search
                    </span>
            </div>
            <div className='h-full flex items-center justify-center flex-1'>
                {userData?
                        <span className="material-symbols-outlined text-shadow-stone-800 " style={{ fontSize: '36px' }}>
                        account_circle
                        </span>:
                        <button className='bg-[#DF1827] h-full w-full text-white text-md font-bold rounded-2xl' onClick={openModal}>SignIn</button>
                }
            </div>
            <Login isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal}/>
        </div>
    </div>
  )
}

export default Header