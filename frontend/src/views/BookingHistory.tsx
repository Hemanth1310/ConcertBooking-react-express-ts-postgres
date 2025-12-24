import { useBookingHistory } from '../utils/hooks/concertDataHook'
import Order from '../components/Order'
import Spinner from '../components/Spinner'


const BookingHistory = () => {
    const {data:bookingHistory,isLoading,isError,refetch} = useBookingHistory()
    

    if (isLoading) {
    return (
      <div className="w-full h-screen flex font-mono italic text-gray-500 items-center justify-center text-3xl">
        <Spinner/>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="w-full h-screen flex font-mono italic text-gray-500 items-center justify-center text-3xl">
        "Error Occured: cannot fetch data. please try again"
        <button onClick={() => refetch()}>Try Again</button>
      </div>
    );
  }
  if (!bookingHistory) {
    return <div className="w-full h-screen flex font-mono italic text-gray-500 items-center justify-center text-3xl">Nothing to display.</div>;
  }
    
  return (
   <div className="flex px-5 md:px-0 flex-col w-full h-full mt-5">
      <h1 className="text-2xl md:text-3xl font-bold font-mono py-5">
        Your previous bookings
      </h1>
      <div className="flex flex-col gap-5">
        {bookingHistory.map(bookingDetails=>(
            <Order bookingDetails={bookingDetails} key={bookingDetails?.id}/>
        ))}
      </div>
    </div>
  )
}

export default BookingHistory