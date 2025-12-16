import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from 'react-router'
import Header from './components/Header'
import Login from './components/Authentication'
import AuthConextProvider from './context/AuthContext'
import ProtectedRoutes from './authorization/ProtectedRoutes'
import Checkout from './views/Checkout'
import Home from './views/Home'
import Footer from './components/Footer'
import ConcertDetails from './views/ConcertDetails'

function App() {
  return (
    <AuthConextProvider>
      <div className="min-h-screen bg-gray-50">
        <BrowserRouter>
          <div className='w-screen flex flex-col justify-center items-center'>
            <Header/>
            <div className='container mt-[80px] w-full'>
              <Routes>
                {/* <Route path='/login' element={<Login/>}></Route> */}
                
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/concerts/:name/:id' element={<ConcertDetails/>}></Route>
                    <Route element={<ProtectedRoutes/>}>
                        <Route path="/checkout" element={<Checkout/>}></Route>
                    </Route>
            
              </Routes>
              </div>
              <Footer/>
          </div>
            
        </BrowserRouter>
      </div>
    </AuthConextProvider>
  )
}

export default App
