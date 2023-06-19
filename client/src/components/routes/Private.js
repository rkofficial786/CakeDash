import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";





export default function PrivateRoute(){
    const [ok,setOK]=useState(false)
    const [auth,setAuth]=useAuth()
    const navigate =useNavigate()

  
    useEffect(()=>{
        const authCheck =async()=>{
            const res =await axios.get(`/api/v1//user-auth`)

            if(res.data.ok){
                setOK(true)
            }
            else{
                setOK(false)
            }
           
        }
      
        if(auth?.token) authCheck()

    },[auth?.token])

    return ok ? <Outlet/> : <Spinner/>
}