import React from 'react'
import { useConcerts } from '../utils/hooks/concertDataHook';
import getImageUrl from '../utils/getImageUrl';
import HeroComponent from '../components/HeroComponent';
import dataProvider from '../utils/dataProvider';

type Props = {}

const Home  = (props: Props) => {
  const {catogorisedData,featuredData,isLoading,isError} = dataProvider()
  if(isLoading){
    return <div>"Page is loading . please wait"</div>
  }
  if(isError){
    return <div>"Error Occured: cannot fetch data. please try again"</div>
  }

  const concert_types = Object.keys(catogorisedData)
  return (
    <div className='w-full flex flex-col items-center'>
        <HeroComponent concerts={featuredData}/>
        <div className='w-full mt-5 flex flex-col gap-10'>
          {concert_types.map(concert_type=>(
            <div>
              <h1 className='text-2xl md:text-3xl py-5'>{concert_type}</h1>
              <div className='flex gap-4'>
              {catogorisedData[concert_type].map(concert=>{
                const dateObject = new Date(concert.date)
                return(
                <div className='flex flex-col  overflow-x-scroll w-48' key={concert.id}>
                    <img className='' src={getImageUrl(concert.imagePath)}/>
                    <div>{concert.name}</div>
                    <div>{concert.description}</div>
                    <div> {dateObject.toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                  })}</div>
                </div>
                )})}
                </div>
            </div>
          ))}

        </div>
    </div>
   
  )
}

export default Home