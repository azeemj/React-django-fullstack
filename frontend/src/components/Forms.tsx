import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant";
import LoadingIndicator from "./LoadingIndicator";
import "../styles/Form.css"

function Form({route, method} : {route: string, method: "login" | "register" | "other" }){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState("")
    const navigate = useNavigate()

    
    const name = method === "login" ? "Login" : "Regsiter"
    
    const handleSubmit = async(e: any) => {
        e.preventDefault()

        try{
            const res = await api.post(route, {username, password});

            if (method == 'login'){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate("/")
            }else{
                navigate("/login")
            }

        }catch(error){
            alert(error)
        }finally{   
            setLoading(false);
        }
    }
    return (<form onSubmit={handleSubmit} className="form-container">
        <h1> {name} </h1>
        <input className="form-input" type="text" value={username} 
        onChange={(e) => setUsername(e.target.value)}></input>

        <input className="form-input" type="password" value={password}
        onChange={(e) => setPassword(e.target.value)} placeholder="Password"  ></input>

        {loading && <LoadingIndicator />}
        <button className="form-button" type="submit">
            {name}
        </button>

    </form>
    );
}

export default Form