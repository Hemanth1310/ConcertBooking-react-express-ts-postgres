import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from 'react-router'
import Header from './components/Header'
import Login from './views/Login'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BrowserRouter>
        <div className='w-screen flex flex-col justify-center items-center'>
            <Header/>
          <Routes>
            <Route path='/' element={<Login/>}></Route>
          </Routes>
        </div>
          
      </BrowserRouter>
    </div>
  )
}

export default App
