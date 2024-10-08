import axios, { InternalAxiosRequestConfig  } from "axios";
import { ACCESS_TOKEN } from "./constant";

const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
})

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig ) =>{
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }

        // Always return the config
        return config;
    },
    (error) => {
        // Handle the error if there's an issue with the request configuration
        return Promise.reject(error);
    }

);


export default api