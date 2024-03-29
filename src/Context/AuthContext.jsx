import { createContext, useState, useContext, useEffect } from "react";
import { getLoggedInUser } from "../EndPoints/EndPoints";
const authContext = createContext()
const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token")??"")
    const [user, setUser] = useState({})
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    useEffect(()=>{
        ( async ()=>{
            if(localStorage.getItem("user")){
            const userData = JSON.parse(localStorage.getItem("user"))
            if (!userData && token){
               const user =await getLoggedInUser({token});
               localStorage.setItem("user", JSON.stringify(user.user))
               setUser(user.user)
            }

        }

        })()
    },[ ])


    useEffect(()=>{
        if(localStorage.getItem("user")){

        const userData = JSON.parse(localStorage.getItem("user"))
        if (userData){
            setUser(userData)
        }
    }

    },[])
   
    return (
        <authContext.Provider value={
            {
                isAuthenticated,
                setIsAuthenticated,
                user,
                setUser,
                token,
                setToken
            }
        }
        >
            {children}
        </authContext.Provider>
    )
}
const useAuth = ()=>{
    const {user, isAuthenticated, setIsAuthenticated, setUser, setToken, token} = useContext(authContext)
    return {user, isAuthenticated, setIsAuthenticated, setUser , setToken, token}
}

export {
    AuthProvider, 
    useAuth,

}