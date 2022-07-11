import jwtDecode from "jwt-decode";
import { createContext, useState, useEffect } from "react";

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) => {
    const [authTokens, setAuthTokens] = useState(null)
    const [user, setUser] = useState(null)

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
        }else{
            alert('Invalid')
        }
    }

    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser
    }
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}