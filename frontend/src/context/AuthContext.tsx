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
        const checkAuth = async () => {
        const token = localStorage.getItem('token');
        
            if (!token) {
                setIsAuthLoading(false);
                return;
            }

            try {
                const response = await api.get('/api/userDetails');
                handleAuth(response.data.payload);
            } catch (err) {
                console.error('Session verification failed:', err);  
                localStorage.removeItem('token');
                handleAuth(null); 
            }
        };

    checkAuth();
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