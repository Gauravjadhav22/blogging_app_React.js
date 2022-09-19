import { data } from 'autoprefixer'
import React, { useState, useEffect, useRef } from 'react'
import Hashtags from '../components/Hashtags'
import Header from '../components/Header'
import Nav from '../components/Nav'

import CreateBlog from '../components/CreateBlog'
import Blogs from '../components/Blogs'
import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom'




const Feed = () => {

  const {auth} =useAuth()


  return (
    <div className='bg-slate-900 bg-opacity-90 backdrop-blur-3xl '>
      {!auth?.user?.username && <div className='text-white text-xl text-center capitalize' >"you need to be a 
      valid user to comment and upload blogs"
      <br/>
      <Link to='/login' className='text-white hover:underline hover:text-gray-500'>sign in </Link>
      <br/>
      <Link to='/register' className='text-white hover:underline hover:text-gray-500'>sign up</Link>
      
      </div>}
      <div className='flex justify-around items-center xl:flex-row md:flex-col lg:flex-col sm:flex-col ml-44'>
        <CreateBlog />
        <Hashtags />
      </div>
      <div className='flex justify-center items-center'>
        <Blogs />
        <div>
        </div>
      </div>
    </div>
  )
}

export default Feed