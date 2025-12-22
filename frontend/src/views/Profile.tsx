import React, { useState, type ChangeEvent } from 'react'
import { useAuth } from '../context/AuthContext'
import getImageUrl from '../utils/getImageUrl'
import type { UserData } from '../types'


const Profile = () => {
    const {userData} = useAuth()
    const [modifiedUserData,setModifiedUserData] =useState({...userData})
    if (!userData) {
    return <div className="w-full h-screen flex font-mono italic text-gray-500 items-center justify-center text-3xl">Failed to fetch details</div>;
    }

    const handleDetails = (e:ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target
        setModifiedUserData(prev=>({...prev,[name]:value}))
    }

  return (
     <div className="flex px-5 md:px-0 flex-col w-full h-full mt-5">
        <div>
             <h1 className="text-2xl md:text-3xl font-bold font-mono py-5">
                Account Details
            </h1>
            <div className='flex flex-col md:flex-row w-full'>
                <div className='flex-1 '>
                    {userData.imagePath ? 
                        <img src={getImageUrl(userData.imagePath)} />:
                        <div className='w-full h-full flex items-center justify-center'>
                            <span className="material-symbols-outlined text-gray-800 hover:cursor-pointer text-[clamp(80px,13vw,300px)]!">
                                account_circle
                            </span>
                        </div>}
                   
                </div>
                <div className='flex-3 flex flex-col gap-5'>
                        <div className='w-full flex flex-col md:flex-row  gap-5'>
                            <div className='flex flex-col gap-2 flex-1'>
                                <span className='text-xl px-2'>Firstname</span>
                                <input name='firstname' className='border-2 rounded-2xl border-gray-400 text-xl p-4 w-full' placeholder={userData.firstName}></input>
                            </div>
                             <div className='flex flex-col gap-2 flex-1'>
                                <span className='text-xl px-2'>Lastname</span>
                                <input className='border-2 rounded-2xl border-gray-400 text-xl p-4' placeholder={userData.lastName}></input>
                            </div>

                        </div>
                          <div className='flex flex-col gap-2'>
                                <span className='text-xl px-2'>Email</span>
                                <input className='border-2 rounded-2xl border-gray-400 text-xl p-4' placeholder={userData.email}></input>
                            </div>
                </div>
            </div>
        </div>
     

      </div>
  )
}

export default Profile