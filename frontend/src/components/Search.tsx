import {  useState } from 'react'
import type { Concert } from '../types'
import { useNavigate } from 'react-router'
import useDataProvider from '../utils/dataProvider'
import Spinner from './Spinner'


const Search = ()=> {
    const {concertsData,isLoading,isError} = useDataProvider()
    const [searchInput, setSearchInput] = useState<string>('')
    const navigate = useNavigate()

    if(isError){
        return <div>"Error Occured: cannot fetch data. please try again"</div>
    }
    
    const searchedConcertList :Concert[]= concertsData.filter(concert=>concert.name.toLocaleLowerCase().includes(searchInput))

    const handleNavigation=(id:number,name:string)=>{
        const formattedName = name.replaceAll(" ","_")
        navigate(`/concerts/${formattedName}/${id}`)
    }

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
                    {searchedConcertList.slice(0,7).map(concert=><div className='flex py-5 px-3 md:px-10 gap-3 hover:bg-white hover:shadow-md rounded-2xl'>
                        <span className="material-symbols-outlined text-gray-400" style={{ fontSize: '32px' }}>
                                search
                            </span>
                            <div className='w-full text-sm md:text-xl text-gray-600' key={concert.id} onClick={()=>handleNavigation(concert.id,concert.name)}>{concert.name}</div>
                    </div>
                    )}
                    {  isLoading&& <div className='min-w-1/3 flex w-full justify-center'>
                            <Spinner/>
                    </div>}

                </div>

            }
           
    </div>
  )
}

export default Search