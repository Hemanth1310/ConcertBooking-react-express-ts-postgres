import React, { useState } from 'react'
import { useParams } from 'react-router'
import dataProvider from '../utils/dataProvider'
import getImageUrl from '../utils/getImageUrl'
import { useConcertDetails, useTicketInfo } from '../utils/hooks/concertDataHook'

type Props = {}

const ConcertDetails = (props: Props) => {
    const {name,id} = useParams()
    const {data:concert,isLoading,isError} = useConcertDetails(Number(id))
    const {data:ticketInfo,isLoading:isTicketsLoading,isError:isTicketsError} = useTicketInfo(Number(id))
    const [count,setCount] = useState({})
    
    if(isLoading){
    return <div>"Page is loading . please wait"</div>
  }
  if(isError){
    return <div>"Error Occured: cannot fetch data. please try again"</div>
  }
    if(!concert){
            return <div>Failed to fetch details</div>
        }
    const dateObject = new Date(concert.date)
    
   
  
  return (
    <div className='flex flex-col w-full h-full mt-5'>
        <h1 className='text-2xl md:text-3xl font-bold font-mono py-5'>Concert Details</h1>
        <div className='flex flex-col md:flex-row gap-5'>
            <div className='flex-1'>
                <img className='' src={getImageUrl(concert.imagePath)} />
            </div>
            <div className='flex-1'>
                <h1 className='text-2xl md:text-3xl font-bold font-mono py-5'>{name?.replaceAll('_',' ')}</h1>
                    <div className='text-2xl font-light'>{concert.description}</div> 
                     <div className='text-lg'> {dateObject.toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                  })}</div>
                  <div className='font-bold'>@{concert.venue}</div>
                  
            </div>
            
        </div>
       
         <div>
            <h1 className='text-2xl md:text-3xl font-bold font-mono py-5'>Tickets Information</h1>
            {isTicketsLoading&&<div>Loading, please wait</div>}
            
            <div className=''>
                {ticketInfo?.map(ticket=>{
                    const availabilityPercent = ticket.availableQuantity/ticket.totalQuantity
                return(
                <div className='flex gap-2 items-center rounded-2xl shadow-md justify-between'>
                     <div className={`flex-1 flex flex-col px-10 py-5  `}>
                        <div className={`flex-1  text-2xl rounded-tl-2xl rounded-tr-2xl flex items-center text-gray-800`} >{ticket.name}</div>
                        {availabilityPercent<0.3 && <div className='text-red-600'>Scarsity</div>}
                        {(availabilityPercent<0.5 && availabilityPercent>0.3)&& <div className='text-orange-400'>Fast Filling</div>}
                          {availabilityPercent>0.5 && <div className='text-green-600'>Available</div>}
                    </div>
                    <div className={`flex-1 flex p-5 items-center justify-between  `}>
                        <div> 
                            <div className='text-2xl '>Spots Left</div>
                            <p>{ticket.availableQuantity}</p>
                        </div>
                      
                       
                    </div>
                     <div className={`flex-1 flex p-5 items-center justify-between  `}>

                       <div>
                            <div className='text-2xl '>Price</div>
                            <p>${ticket.price}</p>
                       </div>
                       
                    </div>
                    <div className={`flex p-5 items-center justify-between  `}>
                        <div className='bg-gray-900 px-5 py-3 rounded-2xl text-white text-2xl'>Book</div>

                    </div>
                </div>)})}
            
            </div>

            
        </div>
    
    </div>
  )
}

export default ConcertDetails