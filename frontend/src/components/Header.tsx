import React from 'react'

type Props = {}

const Header = (props: Props) => {
  return (
    <div className='w-screen h-[60px] bg-white flex items-center justify-center fixed top-0 left-0 z-10'>
        <div className='container mx-auto flex items-center justify-between bg-amber-200 h-full'>
            <h1 className='text-2xl text-shadow-stone-800'>ConcertZ</h1>
            <div className='bg-gray-600 h-full w-full'>jfek</div>
        </div>
    </div>
  )
}

export default Header