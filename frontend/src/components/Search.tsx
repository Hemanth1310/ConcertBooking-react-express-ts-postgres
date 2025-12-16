import React, { useState } from 'react'
import dataProvider from '../utils/dataProvider'

type Props = {}

const Search = (props: Props) => {
    const [searchInput, setSearchInput] = useState<string>('')
    const {concertNames} = dataProvider()

  return (
    <div className='w-full h-full'>
   <div className='border px-5 border-gray-400 h-full w-full flex justify-between items-center rounded-2xl flex-7'>
                <input className='h-full w-full md:text-xl focus:outline-none ' type='text' value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} placeholder='Search for concerts around berlin'></input>
                     <span className="material-symbols-outlined text-gray-400" style={{ fontSize: '32px' }}>
                        search
                    </span>
    </div>
    </div>
  )
}

export default Search