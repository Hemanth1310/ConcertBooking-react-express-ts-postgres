import React from 'react'
import { useConcerts } from '../utils/hooks/concertDataHook';
import getImageUrl from '../utils/getImageUrl';

type Props = {}

const Home  = (props: Props) => {
  const { data: concerts, isLoading, isError } = useConcerts();
  if(isLoading){
    return <div>"Page is loading . please wait"</div>
  }
  if(isError){
    return <div>"Error Occured: cannot fetch data. please try again"</div>
  }
  const featuredList = concerts?.filter(concert=>concert.isFeatured===true)
  return (
    <div>
      <div>{featuredList?.map(concert=>
        <div>
          <h1>{concert.name}</h1>
          <img src={getImageUrl(concert.imagePath)}/>
        </div>)}</div>
    </div>
  )
}

export default Home