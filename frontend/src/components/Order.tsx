import type { BookingDetails } from '../types'
import getImageUrl from '../utils/getImageUrl'

type Props = {
    bookingDetails:BookingDetails
}

const Order = ({bookingDetails}: Props) => {

    if(!bookingDetails){
         return <div className="w-full h-screen flex font-mono italic text-gray-500 items-center justify-center text-3xl">Failed to fetch details</div>;
    }

    const ticketType = bookingDetails?.ticketType
    const concert = ticketType?.concert

        const dateObject = new Date(bookingDetails!.createdAt)
        const concertDate = new Date(concert.date)
  return (
    <div className='flex flex-col w-full border-2 border-gray-300 py-5 px-5 md:px-20 rounded-2xl gap-5'>
        <div className='flex w-full justify-between'>
            <div>
                <p className='text-sm md:text-xl'>Order ID</p>
                <p className='text-gray-500'>#{bookingDetails?.id}</p>
            </div>
            
            <div>
                <p className='text-sm md:text-xl'>Order Date</p>
                
                <div className='text-gray-500'>
                        {" "}
                        {dateObject.toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                        })}
                </div>
            </div>
            <div>
                <p className='text-sm md:text-xl'>Quantity</p>
                <p className='text-gray-500'>{bookingDetails?.quantity}</p>
            </div>
            <div>
                <p className='text-sm md:text-xl'>Total Price</p>
                <p className='text-gray-500'>{bookingDetails?.totalPrice}</p>
            </div>
            
        </div>
        <div className='w-full h-1 bg-gray-300 rounded-2xl'></div>
        <div className='flex-1 flex flex-col md:flex-row gap-5 '>
            <div className='flex-1 h-auto w-full md:w-50'>
                <img src={getImageUrl(concert.imagePath)}></img>
            </div>
            <div className='flex-2 '>
                <h1 className='text-3xl'>{concert.name}</h1>
                <p className='text-lg'>{concert.artist}</p>
                <p className='text-lg'>{concert.category}</p>
               
            </div>
            <div className='flex-2'>
                <p className='text-xl'>{ticketType.name}</p>
                 <div className='text-2xl font-bold'>
                    @{concert.venue}</div>
                 <div className='text-gray-500 text-lg'>
                        {" "}
                        {concertDate.toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                        })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Order