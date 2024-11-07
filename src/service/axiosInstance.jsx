import axios from "axios";
import {Cookies} from "react-cookie";

const cookie = new Cookies();

const axiosInstance = axios.create({
    baseURL : process.env.REACT_APP_BASE_URL,
    timeout : 10000,
    headers : {
        'Authorization' : `Bearer ${cookie.get("Authorization")}`,
        'Access-Control-Allow-Origin' : '*'
    },
    withCredentials : true
})

export default axiosInstance;