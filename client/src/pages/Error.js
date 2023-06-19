import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'



const Error = () => {
  return (
    <div className='text-customWhite'>
        <Navbar/>
    <div className='text-customWhite flex items-center justify-center h-screen flex-col gap-8 mx-7'>
    {/* <Helmet>
            <title>Not Found</title>
          </Helmet> */}
      
      <h1 className='text-8xl font-extrabold '>404</h1>
      <h2 className='text-4xl font-bold'>UH Oh ! You're Lost</h2>
      <p>The page you are looking for does not exist . How you got here is still a mystery , however you can click below button to go to Home Page</p>

     <Link to={"/"}> <button className='btn'>Home</button></Link>


     
      
      </div>
     {/* <Footer/> */}
      </div>
  )
}

export default Error