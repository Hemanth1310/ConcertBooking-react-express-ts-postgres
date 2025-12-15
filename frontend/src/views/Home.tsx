import React from 'react'
import { useConcerts } from '../utils/hooks/concertDataHook';
import getImageUrl from '../utils/getImageUrl';
import HeroComponent from '../components/HeroComponent';

type Props = {}

const Home  = (props: Props) => {
  const { data: concerts, isLoading, isError } = useConcerts();
  if(isLoading){
    return <div>"Page is loading . please wait"</div>
  }
  if(isError){
    return <div>"Error Occured: cannot fetch data. please try again"</div>
  }
  if(!concerts){
    return <div>"Error Occured: cannot fetch data. please try again"</div>
  }
  
  return (
    <div className='w-full flex flex-col items-center'>
        <HeroComponent concerts={concerts}/>
    </div>
   
  )
}

export default Home