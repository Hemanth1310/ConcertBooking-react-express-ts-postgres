

const BookingDetails = () => {
   
  return (
    <div className="flex px-5 md:px-0 flex-col w-full h-full mt-5">
        <div className="flex w-full items-center justify-center">
            
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
            {TicketInfoById? <div className='flex gap-10 text-2xl items-center'>
                  <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                    local_activity
                  </span>
                  <div className="">{TicketInfoById[0].name}</div>
             </div>:<div className="w-full h-20 font-mono italic text-gray-500 text-center">
              "Error Fetching Tickets info, Please comback later"
            </div>}
            <div className='flex gap-10 text-2xl items-center'>
                  <div className=""><u>Select Quantity</u></div>
             </div>
             <div className='flex gap-10 text-3xl items-center w-full justify-center px-10'>
                 <div className="font-bold hover:text-white hover:bg-black p-3 rounded-2xl cursor-pointer" onClick={()=>setQuantity(prev=>prev-1)}>-</div>
                 <div className="border-2 border-black  text-center w-16 rounded-2xl">{quantity}</div>
                 <div className="font-bold hover:text-white hover:bg-black p-3 rounded-2xl cursor-pointer" onClick={()=>setQuantity(prev=>prev+1)}>+</div>
             </div>
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
             <div className='flex w-full gap-10 text-2xl items-center justify-center'>
             </div>
            
          </div>

        
        </div>
    </div>
  )
}

export default BookingDetails