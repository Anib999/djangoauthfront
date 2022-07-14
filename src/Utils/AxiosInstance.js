import axios from "axios";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";

const baseURL = 'http://127.0.0.1:8000/'

let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null

const AxiosInstance = axios.create({
    baseURL,
    headers: {
        Authorization: `Bearer ${authTokens?.access}`
    }
})

AxiosInstance.interceptors.request.use(async res => {
    if(!authTokens){
        authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
        res.headers.Authorization = `Bearer ${authTokens?.access}`
    }

    const user = jwtDecode(authTokens.access)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    if(!isExpired) return res

    const response = axios.post(`${baseURL}api/token/refresh/`,{
        refresh: authTokens.refresh
    })

    localStorage.setItem('authTokens', JSON.stringify(response.data))
    res.headers.Authorization = `Bearer ${response.data.access}`

    return res
}, err => {
    console.log(err);
})

export default AxiosInstance