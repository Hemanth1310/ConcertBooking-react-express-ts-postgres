import React, { useEffect, useState } from 'react'
import dataProvider from '../utils/dataProvider'

type Props = {}

const Search = (props: Props) => {
    const [searchInput, setSearchInput] = useState<string>('')
    const {concertNames} = dataProvider()

    const searchName = concertNames.filter(concertName=>concertName.toLocaleLowerCase().includes(searchInput))

  return (
    <div className='w-full h-full'>
            <div className='border px-5 border-gray-400 h-full w-full flex justify-between items-center rounded-2xl flex-7'>
                        <input className='h-full w-full md:text-xl focus:outline-none ' type='text' value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} placeholder='Search for concerts around berlin'></input>
                            <span className="material-symbols-outlined text-gray-400" style={{ fontSize: '32px' }}>
                                search
                            </span>
            </div>
            {searchInput.length>0 && 
                <div className='rounded-2xl min-h-16 w-full bg-gray-100 shadow-md mt-2 p-3'>
                    {searchName.slice(0,7).map(avaiName=><div className='flex py-5 px-3 md:px-10 gap-3 hover:bg-white hover:shadow-md rounded-2xl'>
                        <span className="material-symbols-outlined text-gray-400" style={{ fontSize: '32px' }}>
                                search
                            </span>
                            <div className='w-full text-sm md:text-xl text-gray-600' key={avaiName}>{avaiName}</div>
                    </div>
                    )}
                </div>

            }
           
    </div>
  )
}

export default Search