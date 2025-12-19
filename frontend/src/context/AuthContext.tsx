import { createContext, useContext, useEffect, useState } from "react";
import type { UserData } from "../types";
import api from "../utils/axiosConfig";

type AuthContextType = {
    userData:UserData|null,
    isAuthLoading: boolean,
    handleAuth: (authUserDetails:UserData|null)=>void
}

type AuthConextProviderType = {
    children: React.ReactNode
}

const defaultUser = {
    userData:null,
    isAuthLoading:true,
    handleAuth:()=>{}
}

const AuthContext = createContext<AuthContextType>(defaultUser)

const AuthConextProvider =({children}:AuthConextProviderType)=>{
    const [userData,setUserData] = useState<UserData|null>(null)
    const [isAuthLoading,setIsAuthLoading] = useState<boolean>(true)

    const handleAuth = (authUserDetails:UserData|null)=>{
        setUserData(authUserDetails)
         setIsAuthLoading(false)
    }

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            api.get('/api/userDetails')
                .then(response=>handleAuth(response.data.payload))
                .catch(err=>{
                    setIsAuthLoading(false);
                    console.log('Session Timedout'+err)
                })
        }
    },[])

    return(
    <AuthContext.Provider value={{userData,isAuthLoading,handleAuth}}>
        {children}
    </AuthContext.Provider>)
}

export const useAuth=()=>{
    return useContext(AuthContext)
}

export default AuthConextProvider