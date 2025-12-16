import React from 'react'
import { useConcerts } from '../utils/hooks/concertDataHook';
import getImageUrl from '../utils/getImageUrl';
import HeroComponent from '../components/HeroComponent';
import dataProvider from '../utils/dataProvider';
import { useNavigate } from 'react-router';

type Props = {}

const Home  = (props: Props) => {
  const {catogorisedData,featuredData,isLoading,isError} = dataProvider()
  const navigate = useNavigate()
  if(isLoading){
    return <div>"Page is loading . please wait"</div>
  }
  if(isError){
    return <div>"Error Occured: cannot fetch data. please try again"</div>
  }

  const handleNavigation=(id:number,name:string)=>{
        const formattedName = name.replaceAll(" ","_")
        navigate(`/concerts/${formattedName}/${id}`)
    }

  const concert_types = Object.keys(catogorisedData)
  return (
    <div className='w-full flex flex-col items-center'>
        <HeroComponent concerts={featuredData}/>
        <div className='w-full mt-5 flex flex-col gap-10  p-5 md:p-0 '>
          {concert_types.map(concert_type=>(
            <div>
              <h1 className='text-2xl md:text-3xl font-bold font-mono py-5'>{concert_type.replaceAll('_',' ')}</h1>
              <div className='flex overflow-x-scroll scrollbar-hide gap-4 p-4 md:p-6 lg:p-8 snap-x snap-proximity'>
              {catogorisedData[concert_type].map(concert=>{
                const dateObject = new Date(concert.date)
                return(
                <div className='flex flex-col shrink-0 w-80 snap-start' key={concert.id}>
                    <img className='h-52 w-80 cursor-pointer hover:opacity-70' onClick={()=>handleNavigation(concert.id,concert.name)} src={getImageUrl(concert.imagePath)}/>
                    <div className='text-2xl font-sans mt-3 cursor-pointer hover:font-stretch-105% hover:underline' onClick={()=>handleNavigation(concert.id,concert.name)}>{concert.name}</div>
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