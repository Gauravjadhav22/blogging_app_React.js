import React, { useContext, useState } from 'react'
import { RiNotificationBadgeFill, RiNotificationBadgeLine } from "react-icons/ri"
import { Link } from 'react-router-dom'
import { VscSearch } from "react-icons/vsc"
import { ImFeed, ImProfile } from "react-icons/im"
import useAuth from '../hooks/useAuth'
import { BiHome, BiLogOut } from 'react-icons/bi'
import useLogout from '../hooks/useLogout'
import BlogsContext from '../context/BlogsProvider'
import { FaHome } from 'react-icons/fa'




const Nav = () => {
    const logout = useLogout()

    const { auth, } = useAuth()
    const persist = localStorage.getItem("persist") || false;

    const { foundUserName, setFoundUserName, findUser } = useContext(BlogsContext)

    return (
        <div className='pb-1 flex lg:flex-col xl:flex-row md:flex-col sm:flex-col bg-slate-500 px-4 py-1 text-blue-800 justify-around xl:items-center md:items-stretch lg:items-stretch sm:items-stretch'>
            <Link to='/'>
                <h1 className='flex-1 text h-fit bg-slate-600 text-center text-2xl text-white shadow-lg shadow-cyan-300 px-2'>Blogging App</h1>
            </Link>

            {auth?.user?.username && <div className='flex-1 sm:my-2 flex justify-center'>
                <div className='shadow-blue-500 shadow flex justify-center items-center w-fit border-2 border-blue-400 bg-green-800 sm:my-4'>
                    <input value={foundUserName} onChange={(e) => setFoundUserName(e.target.value)} className='p-1 h-full' type='text' placeholder='Search Username' />
                    <Link to='/finduser'>   <VscSearch onClick={() => {
                        findUser()
                        setFoundUserName("")

                    }} className='text-blue-400 p-1 shadow-red shadow text-4xl hover:text-white' /></Link>
                </div>
            </div>}
            {auth?.accessToken && <div className='flex-1 flex justify-center xl:flex-row lg:flex-row md:flex-col sm:flex-col'>
                <Link to='/'>    <div className='hover:text-white flex text-lg text-black mt-2 hover:shadow-amber-100 justify-center items-center mx-8 hover:underline cursor-pointer shadow-xl'><BiHome /> Feed</div>
                </Link>
                <Link to='/profile'>    <div className='hover:text-white flex text-lg text-black mt-2 hover:shadow-amber-100 justify-center items-center mx-8 hover:underline cursor-pointer shadow-xl'><ImProfile /> Profile</div>
                </Link>
                <div className='hover:text-white flex text-lg text-black mt-2 hover:shadow-amber-100 justify-center items-center mx-8 hover:underline cursor-pointer shadow-xl'>{!true ? <RiNotificationBadgeLine /> : <RiNotificationBadgeFill />} Notifications</div>
                <button onClick={() => {
                    logout()
                }} className='hover:text-white flex text-lg text-black mt-2 hover:shadow-amber-100 justify-center items-center mx-8 hover:underline cursor-pointer shadow-xl'><BiLogOut /> Logout</button>



            </div>
            }
            {
                !auth?.accessToken && !persist &&
                <div className='flex-0 flex mt-4 items-stretch justify-center'>
                    <Link to='/login'>
                        <button className='bg-blue-600 p-2 mr-4 rounded-lg text-white hover:bg-blue-400'>

                            Sign In
                        </button>
                    </Link>
                    <Link to='/' className=''>
                        <button className='text-white bg-blue-600 p-2 mr-4 rounded-lg hover:bg-blue-400'>
                            Home
                        </button>
                        <FaHome className='p-2 mr-4 rounded-lg text-black hover:bg-blue-200' />
                    </Link>
                    <Link to='/register'>
                        <button className='bg-blue-600 p-2 ml-4 rounded-lg text-white hover:bg-blue-400'>    Sign Up</button></Link>
                </div>}
        </div>

    )
}

export default Nav