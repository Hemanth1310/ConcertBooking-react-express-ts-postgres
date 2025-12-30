import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Spinner from '../components/Spinner'

const ProtectedRoutes = () => {
    const {userData,isAuthLoading} = useAuth()
    if(isAuthLoading){
        return <div className="w-full h-screen flex flex-col gap-5 font-mono italic text-gray-500 items-center justify-center text-3xl">
        <Spinner/>
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