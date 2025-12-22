import React from 'react'
import { useAuth } from '../context/AuthContext'
import Spinner from '../components/Spinner'
import getImageUrl from '../utils/getImageUrl'


const Profile = () => {
    const {userData,isAuthLoading} = useAuth()

    if(isAuthLoading){
        <div className="w-full h-screen flex font-mono italic text-gray-500 items-center justify-center text-3xl">
            <Spinner/>
        </div>
    }
  return (
     <div className="flex px-5 md:px-0 flex-col w-full h-full mt-5">
        <div>
             <h1 className="text-2xl md:text-3xl font-bold font-mono py-5">
                Account Details
            </h1>
            <div className='flex'>
                <div>
                    {/* <img src={getImageUrl(userData?.firstName)} */}
                </div>
                <div>

                </div>
            </div>
        </div>
     

      </div>
  )
}

export default Profile