import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)

    const loginUser = async (e) => {
        e.preventDefault()
        let url = `http://127.0.0.1:8000/api/token/`
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                "username": e.target.username.value,
                "password": e.target.password.value
            })
        })
        let data = await response.json()
        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        }else{
            alert('Invalid')
        }
    }

    const logOutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    // const updateToken = async () => {
    //     let url = 'http://127.0.0.1:8000/api/token/refresh/'
    //     const response = await fetch(url,{
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             "refresh": authTokens?.refresh
    //         })
    //     })

    //     let data = await response.json()

    //     if(response.status === 200) {
    //         setAuthTokens(data)
    //         setUser(jwtDecode(data.access))
    //         localStorage.setItem('authTokens', JSON.stringify(data))
    //     }else{
    //         logOutUser()
    //     }

    //     if(loading){
    //         setLoading(false)
    //     }
    // }

    // useEffect(() => {
    //     if(loading){
    //         updateToken()
    //     }
    //   const interval = setInterval(() => {
    //     if(authTokens)
    //         updateToken()
    //   }, 4500)
    
    //   return () => {
    //     clearInterval(interval)
    //   }
    // }, [authTokens, loading])
    
    useEffect(() => {

        if(authTokens)
            setUser(jwtDecode(authTokens.access))
        setLoading(false)

    }, [authTokens, loading])


    const contextData = {
        user: user,
        authTokens: authTokens,
        setAuthTokens: setAuthTokens,
        setUser: setUser,
        loginUser: loginUser,
        logOutUser: logOutUser
    }
    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}