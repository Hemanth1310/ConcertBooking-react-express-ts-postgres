import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


type Props = {}

const ProtectedRoutes = (props: Props) => {
    const {userData} = useAuth()
    if(userData){
        return <Outlet/>
    }else{
        return <Navigate to='/login' replace/>
    }
  
}

export default ProtectedRoutes