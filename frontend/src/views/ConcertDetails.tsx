import React from 'react'
import { useParams } from 'react-router'
import dataProvider from '../utils/dataProvider'
import getImageUrl from '../utils/getImageUrl'
import { useConcertDetails } from '../utils/hooks/concertDataHook'

type Props = {}

const ConcertDetails = (props: Props) => {
    const {name,id} = useParams()
    const {data:concert,isLoading,isError} = useConcertDetails(Number(id))
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
        <div className='flex gap-5'>
            <div className='flex-1'>
                <img className='' src={getImageUrl(concert.imagePath)} />
            </div>
            <div className='flex-1'>
                <h1 className='text-2xl md:text-3xl font-bold font-mono py-5'>{name?.replaceAll('_',' ')}</h1>
                    <div>{concert.description}</div> 
                     <div> {dateObject.toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                  })}</div>
                 

            </div>
        </div>
        
    
    </div>
  )
}

export default ConcertDetails