import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoutes = () => {
    const {userData} = useAuth()
    if(userData){
        return <Outlet/>
    }else{
        return <Navigate to='/' replace/>
    }
  
}

export default ProtectedRoutes