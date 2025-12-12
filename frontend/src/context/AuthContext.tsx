import { Children, createContext, useContext, useState } from "react";
import type { UserData } from "../types";

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

    const handleAuth = (authUserDetails:UserData)=>{
        setUserData(authUserDetails)
    }

    return(
    <AuthContext.Provider value={{userData,handleAuth}}>
        {children}
    </AuthContext.Provider>)
}

export const useAuth=()=>{
    return useContext(AuthContext)
}

export default AuthConextProvider