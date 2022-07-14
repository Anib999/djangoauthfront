import axios from "axios";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AxiosInstance from "./AxiosInstance";
import AuthContext from "../Context/AuthContext";

const baseURL = 'http://127.0.0.1:8000/'

const useAxios = () => {
    const { authTokens, setUser, setAuthTokens } = useContext(AuthContext)

    const AxiosInstance = axios.create({
        baseURL,
        headers: {
            Authorization: `Bearer ${authTokens?.access}`
        }
    })

    AxiosInstance.interceptors.request.use(async res => {
    
        const user = jwtDecode(authTokens.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
        if(!isExpired) return res
    
        const response = axios.post(`${baseURL}api/token/refresh/`,{
            refresh: authTokens.refresh
        })
    
        localStorage.setItem('authTokens', JSON.stringify(response.data))

        setAuthTokens(response.data)
        setUser(jwtDecode(response.data.access))

        res.headers.Authorization = `Bearer ${response.data.access}`
    
        return res
    }, err => {
        console.log(err);
    })

    return AxiosInstance
}

export default useAxios