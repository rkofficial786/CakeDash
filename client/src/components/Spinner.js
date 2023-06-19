import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Spinner = ({path ="login"}) => {

const [count,setCount] =useState(3)
const navigate =useNavigate()
const location = useLocation()


useEffect(()=>{
   const interval =setInterval(()=>{
    setCount((prevalue)=> --prevalue)
   },1000)
   
   count === 0 && navigate(`/${path}`,{
    state:location.pathname
   })
   return ()=> clearInterval(interval)
},[count,navigate,location,path])
  return (
    <div className='h-screen gap-6 flex flex-col justify-center  items-center relative z-50'>
     <h1 className='text-3xl'>Redirecting you in {count} seconds</h1>
    <div className='shapes '></div>

    </div>
  )
}

export default Spinner