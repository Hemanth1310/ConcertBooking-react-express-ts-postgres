import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useConcertDetails, useTicketInfo } from '../utils/hooks/concertDataHook'
import getImageUrl from '../utils/getImageUrl'
import api from '../utils/axiosConfig'
import Spinner from '../components/Spinner'

const Booking = () => {
  const {name,id,ticketType} = useParams()
  const {data:concert,isLoading:isConcertLoading,isError:isConcertError} = useConcertDetails(Number(id))
  const [quantity,setQuantity]=useState(0)
  const navigation = useNavigate()
  const {
      data: ticketInfo,
      isLoading: isTicketsLoading,
    } = useTicketInfo(Number(id));
  
  if (isConcertLoading) {
    return (
      <div className="w-full h-screen flex font-mono italic text-gray-500 items-center justify-center text-3xl">
       <Spinner/>
      </div>
    );
  }
  if (isConcertError) {
    return (
      <div className="w-full h-screen flex font-mono italic text-gray-500 items-center justify-center text-3xl">
        "Error Occured: cannot fetch data. please try again"
      </div>
    );
  }
  if (!concert) {
    return <div className="w-full h-screen flex font-mono italic text-gray-500 items-center justify-center text-3xl">Failed to fetch details</div>;
  }

  const TicketInfoById = ticketInfo?.filter(ticket=>ticket.id===Number(ticketType))


  const dateObject = new Date(concert.date)

  const handleBooking=async()=>{
    try{
      const bookingData = await api.post(`/api/booking/${id}/${ticketType}?qty=${quantity}`)
      navigation(`/booking-details/${bookingData.data.payload.id}`)
    }catch(error){
      console.error(error)
    }
      
      
  }

  return (
    <div className="flex px-5 md:px-0 flex-col w-full h-full mt-5">
      <h1 className="text-2xl md:text-3xl font-bold font-mono py-5">
        Concert Details
      </h1>
      <div className='flex flex-col md:flex-row gap-10'>
        <div className="flex-2 flex flex-col gap-5">
          <div className="flex-1">
            <img className="h-64 w-auto md:h-128" src={getImageUrl(concert.imagePath)} />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold font-mono py-5">
              {name?.replaceAll("_", " ")}
            </h1>
            <div className="text-2xl font-light">{concert.description}</div>
           
          </div>
        </div>
        <div className='flex-1 box-border'>
          <div className='w-full h-full border-gray-400 border-2 rounded-2xl p-10 flex flex-col gap-4'>
            <div className='flex gap-10 text-2xl items-center '>
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                calendar_month
                </span>
                  <div >
                  {" "}
                  {dateObject.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </div>

            </div>
            <div className='flex gap-10 text-2xl items-center '>
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                timer
                </span>
                  <div >
                  {" "}
                  {dateObject.toLocaleTimeString("en-US")}
                </div>

            </div>
             <div className='flex gap-10 text-2xl items-center'>
                  <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                  location_on
                  </span>
                  <div className="font-bold">@{concert.venue}, Berlin</div>
             </div>
            
            {isTicketsLoading &&  <div className="w-full h-screen flex font-mono italic text-gray-500 items-center justify-center text-3xl">
              "Loading . please wait"
            </div>}
            {TicketInfoById? <div className='flex flex-col gap-3'>
              <div className='flex gap-10 text-2xl items-center'>
                  <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                    local_activity
                  </span>
                  <div className="">{TicketInfoById[0].name}</div>
             </div>
              <div className='flex gap-10 text-2xl items-center'>
                  <div className=""><u>Select Quantity</u></div>
             </div>
             <div className='flex gap-10 text-3xl items-center w-full justify-center px-10'>
                 <button disabled={quantity<1} className="font-bold hover:text-white hover:bg-black p-3 rounded-2xl cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400" onClick={()=>setQuantity(prev=>prev-1)}>-</button>
                 <div className="border-2 border-black  text-center w-16 rounded-2xl">{quantity}</div>
                 <button disabled={quantity>=TicketInfoById![0].availableQuantity} className="font-bold hover:text-white hover:bg-black p-3 rounded-2xl cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400" onClick={()=>setQuantity(prev=>prev+1)}>+</button>
             </div>
             <div>{quantity>=TicketInfoById![0].availableQuantity && <div>You are trying to book all the tickets</div> }</div>
             <div className='flex gap-10 text-2xl items-center'>
                  <div className=""><u>Checkout Details</u></div>
             </div>
            <div className='flex flex-col items-center px-10 gap-3'>
                  
                  <div className='flex w-full justify-between'>
                    <div>Number Of Tickets</div>
                    <div>{quantity}</div>
                  </div>
                   <div className='flex w-full justify-between'>
                    <div>Cost per ticket</div>
                    <div>{TicketInfoById![0].price}</div>
                  </div>
                  <div className='w-full h-1 bg-black'></div>
                  <div className='flex w-full font-bold justify-between'>
                    <div>Total</div>
                    <div>${quantity*TicketInfoById![0].price}</div>
                  </div>
             </div>
             </div>:<div className="w-full h-20 font-mono italic text-gray-500 text-center">
              "Error Fetching Tickets info, Please comback later"
            </div>}
           
             <div className='flex w-full gap-10 text-2xl items-center justify-center'>
                  
                  <button disabled={quantity<1 || quantity>=TicketInfoById![0].availableQuantity} onClick={handleBooking} className="bg-gray-900 px-5 py-3 rounded-2xl text-white text-2xl cursor-pointer hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-20">
                      Book
                    </button>
             </div>
            
          </div>

        </div>
      </div>
    </div>
  )
}

export default Booking