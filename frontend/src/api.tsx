import axios, { InternalAxiosRequestConfig  } from "axios";
import { ACCESS_TOKEN } from "./constant";

// const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";

const api = axios.create({
    baseURL: 'http://54.145.59.155:8080"',
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