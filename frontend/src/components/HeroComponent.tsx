import React from 'react'
import type { Concert } from '../types'
import getImageUrl from '../utils/getImageUrl'

type Props = {
    concerts:Concert[]
}

const HeroComponent = ({concerts}: Props) => {
    const featuredList = concerts?.filter(concert=>concert.isFeatured===true)
  return (
  <div className='w-full'>
    {featuredList.map(concert=>
        <div key={concert.id}
          className='relative h-128 bg-cover bg-top items-center flex p-4'
              style={{backgroundImage:`url('${getImageUrl(concert.imagePath)}')`}}>
        <div >
          <div className='absolute z-10 inset-0 bg-black/40 '/>
            <div className="relative z-20 h-full flex items-end p-4">
                <h1 className="text-2xl font-bold text-white leading-tight">
                    {concert.name}
                </h1>
              </div>    
        </div>
         
    </div>)}
    </div>
  )
}

export default HeroComponent