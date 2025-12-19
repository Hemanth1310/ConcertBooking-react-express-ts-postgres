import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useBookingHistory } from '../utils/hooks/concertDataHook'


const BookingHistory = () => {
    const {userData} = useAuth()
    const userId= userData?.id
    const {data:bookingHistory,isLoading,isError} = useBookingHistory(userId ?? '')
    
    if (isLoading) {
    return (
      <div className="w-full h-screen flex font-mono italic text-gray-500 items-center justify-center text-3xl">
        "Page is loading . please wait"
      </div>
    );
  }
  if (isError) {
    return (
      <div className="w-full h-screen flex font-mono italic text-gray-500 items-center justify-center text-3xl">
        "Error Occured: cannot fetch data. please try again"
      </div>
    );
  }
  if (!bookingHistory) {
    return <div className="w-full h-screen flex font-mono italic text-gray-500 items-center justify-center text-3xl">Failed to fetch details</div>;
  }
    
  return (
   <div className="flex px-5 md:px-0 flex-col w-full h-full mt-5">
      <h1 className="text-2xl md:text-3xl font-bold font-mono py-5">
        Your previous bookings
      </h1>
      <div className="flex flex-col md:flex-row gap-5">

      </div>
    </div>
  )
}

export default BookingHistory