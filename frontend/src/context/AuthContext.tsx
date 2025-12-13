import { Children, createContext, useContext, useEffect, useState } from "react";
import type { UserData } from "../types";
import api from "../utils/axiosConfig";

type AuthContextType = {
    userData:UserData|null,
    handleAuth: (authUserDetails:UserData)=>void
}

type AuthConextProviderType = {
    children: React.ReactNode
}

const defaultUser = {
    userData:null,
    handleAuth:()=>{}
}

const AuthContext = createContext<AuthContextType>(defaultUser)

const AuthConextProvider =({children}:AuthConextProviderType)=>{
    const [userData,setUserData] = useState<UserData|null>(null)

    const handleAuth = (authUserDetails:UserData|null)=>{
        console.log(authUserDetails)
        setUserData(authUserDetails)
    }

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            api.get('/api/userDetails')
                .then(response=>setUserData(response.data))
                .catch(err=>console.log(' Session Timedout'))
        }
    },[])

    return(
    <AuthContext.Provider value={{userData,handleAuth}}>
        {children}
    </AuthContext.Provider>)
}

export const useAuth=()=>{
    return useContext(AuthContext)
}

export default AuthConextProvider