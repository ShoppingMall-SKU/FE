import axios from "axios";
import {Cookies} from "react-cookie";

//console.log(document.cookie.replace("Authorization=",  ""))

const axiosInstance = axios.create({
    baseURL : process.env.REACT_APP_BASE_URL,
    timeout : 10000,
    headers : {
        'Authorization' : `Bearer ${document.cookie.replace("Authorization=", "")}`,
        'Content-Type': 'application/json'
    },
})

export default axiosInstance;