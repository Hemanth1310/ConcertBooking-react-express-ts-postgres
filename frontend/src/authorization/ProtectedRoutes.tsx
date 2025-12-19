import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoutes = () => {
    const {userData,isAuthLoading} = useAuth()
    if(isAuthLoading){
        return <div className="w-full h-screen flex font-mono italic text-gray-500 items-center justify-center text-3xl">
        "Page is loading . please wait"
      </div>
    }
    if(userData){
        return <Outlet/>
    }else{
        return <Navigate to='/' replace/>
    }
  
}

export default ProtectedRoutes