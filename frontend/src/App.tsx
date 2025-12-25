import { BrowserRouter, Route, Routes } from 'react-router'
import Header from './components/Header'
import AuthConextProvider from './context/AuthContext'
import ProtectedRoutes from './authorization/ProtectedRoutes'
import Home from './views/Home'
import Footer from './components/Footer'
import ConcertDetails from './views/ConcertDetails'
import Booking from './views/Booking'
import BookingDetails from './views/BookingDetails'
import BookingHistory from './views/BookingHistory'
import Profile from './views/Profile'
import PasswordReset from './views/PasswordReset'

function App() {
  return (
    <AuthConextProvider>
      <div className="min-h-screen bg-gray-50">
        <BrowserRouter>
          <div className='w-screen min-h-screen flex flex-col justify-center items-center'>
            <Header/>
            <div className='container mt-20 w-full'>
              <Routes>
                {/* <Route path='/login' element={<Login/>}></Route> */}
                
                    <Route path='/' element={<Home/>}/>
                    <Route path='/concerts/:name/:id' element={<ConcertDetails/>}/>
                    <Route path='/forgot-password' element={<PasswordReset/>}/>
                    <Route element={<ProtectedRoutes/>}>
                        <Route path="/booking/:name/:id/:ticketType" element={<Booking/>}/>
                        <Route path="/booking-details/:bookingID" element={<BookingDetails/>}/>
                        <Route path="/booking-history" element={<BookingHistory/>}/>
                        <Route path="/profile" element={<Profile/>}/>
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
