import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constant";
import { useState, useEffect } from "react";



interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute = ({children}: ProtectedRouteProps): JSX.Element | null=>{

    const [isAuthorized, setIsAuthorized ]= useState <boolean | null>(null); // Replace with actual auth check

    useEffect(() => {
         auth().catch(() => setIsAuthorized(false)), []
            });

    const refreshToken = async ()=>{
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)

        try{
            const resp = await api.post("api/token/refresh", {
                refresh: refreshToken
            })

            if (resp.status == 200){
                localStorage.setItem(ACCESS_TOKEN, resp.data.access)
                setIsAuthorized(true)
            }else{
                setIsAuthorized(false)
            }

        }catch(error){
            console.log("refresh token error", error)
            setIsAuthorized(false)
        }
    }

    const auth = async ()=>{
        const token = localStorage.getItem(ACCESS_TOKEN)

        if(!token){
            setIsAuthorized(false)
            return ;
        }

        const decdoed =  jwtDecode(token);
        const tokenExpiration = decdoed.exp;
        const now = Date.now()/1000;

        if (tokenExpiration  && tokenExpiration < now ){
            await refreshToken();
        }else{
            setIsAuthorized(true);
        }

    }

    if (isAuthorized == null){
        return <div>Loading ...</div>
    }

    return isAuthorized ? children : <Navigate to="/login"></Navigate>
}

export default ProtectedRoute