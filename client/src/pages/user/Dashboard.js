import React from 'react'

import { useAuth } from '../../context/auth'
import Usermain from '../../components/Usermain'
import { Helmet } from 'react-helmet'


const Dashboard = () => {
  const [auth] =useAuth()
  
  return (
   

    <div className="grid grid-rows-2 gap-4">
      
        <Helmet>
            <title>Dashboard</title>
          </Helmet>
      <div className="col-rows-1">
        <Usermain/>
      </div>
      <div className="col-rows-1 text-center">
        <div className="p-4 ">
          <h3 className="text-3xl font-bold">User Name: {auth?.user?.name}</h3>
          <h3 className="text-3xl font-bold">User Email: {auth?.user?.email}</h3>
         
        </div>
      </div>
    </div>
  );}
export default Dashboard