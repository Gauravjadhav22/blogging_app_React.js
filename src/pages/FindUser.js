import React, { useContext, useEffect, useState } from 'react'
import { FaUserAstronaut } from "react-icons/fa"
import useAuth from '../hooks/useAuth'

import BlogsContext from '../context/BlogsProvider'
import { NavLink } from 'react-router-dom'
import Comments from '../components/Comments'
import IsLoading from '../components/IsLoading'


const FindUser = ({ query }) => {
    console.log(query);
    const [userFoundCheck, setUserFoundCheck] = useState(false)
    const { auth } = useAuth()
    const { userBlogs, foundUser, findUser } = useContext(BlogsContext)
    const [updatebox, setUpdatebox] = useState(false)



    useEffect(() => {
        findUser()
        {
            setTimeout(() => {
                setUserFoundCheck(true)
            }, 2000)
        }
        return () => {
            setUserFoundCheck(false)
        }
    }, [])



    return (
        <div className='flex justify-center'>
            {userFoundCheck ? (<div className='bg-slate-400 text-black w-fit rounded p-2 bg-opacity-90 mt-24'>

                {

                    foundUser?.username ? <> <div className='flex justify-center flex-col items-center '>
                        <div className='overflow-hidden bg-amber-50 rounded-full shadow-md shadow-cyan-400 w-fit p-8 mt-2'>

                            {!foundUser?.picture ? (
                                <>
                                    <div className='flex justify-center '>

                                        <img src='https://res.cloudinary.com/dwmm1r1ph/image/upload/v1669314631/blogApp/oixf4ghlv1xjaji40gjr.png' className='text-6xl text-white w-24' />
                                    </div></>
                            ) : (
                                <div className='flex justify-center items-center'>
                                    <img src={foundUser?.picture} className="w-24" />
                                </div>
                            )}

                        </div>
                        <div className='my-4'>
                            <div className='mt-2 inline-block text-xl text-left text-white'>
                                <div className='shadow mt-2 bg-slate-400 px-2'>{foundUser?.username}</div>
                                <div className='shadow mt-2 bg-slate-400 px-2'>{foundUser?.fullname}</div>
                                <div className='shadow mt-2 bg-slate-400 px-2'>{foundUser?.gmail}</div>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <h2 className='bg-slate-300 text-2xl px-5 rounded mt-4c capitalize'>{foundUser?.username}'s Blogs</h2>
                            <br />
                            <div className='flex flex-col items-center xl:w-144 lg:w-128 md:w-96 sm:w-80  '>

                                {

                                    foundUser?.blogs?.map(item => {
                                        return <>

                                            <div key={item._id} style={{ boxShadow: "2px 2px 8px #fff " }} className={`${updatebox ? "hidden" : "visible"} px-2 flex flex-col items-stretch w-full h-full border-2 border-blue-500 my-8  bg-gray-200 rounded-xl shadow-black shadow-xl max-w-xl text-center transition`} >
                                                <div className=' w-full bg-amber-100 flex justify-between items-center px-4'>

                                                    <div className='font-bold text-lg '>@{item.user.username}</div>
                                                    <div className='font-bold text-sm ml-8'>{item.createdAt}</div>

                                                </div>


                                                <div className='p-4 flex flex-col justify-center text-left w-full bg-slate-300-100 '>


                                                    <br />
                                                    <div className='text-lg text-left break-words border-2 border-gray-200 p-2'>{item.content}</div>


                                                    <div className='flex flex-wrap justify-center items-center p-4'>
                                                        {item?.pictures?.map(item => {
                                                            return <img src={item} className=' hover:scale-125  transition w-52 h-52 m-1' />
                                                        })}

                                                    </div>
                                                    <br />
                                                </div>
                                                <div className="flex justify-center">
                                                    <div className='px-32 p-4 pb-0 xl:w-128 lg:w-128 md:w-96 sm:w-72 h-96 flex flex-col justify-end items-center '>
                                                        <div className='overflow-y-scroll scrollbar-hide mb-1 xl:w-128 lg:w-128 md:w-96 sm:w-80   '>



                                                            <Comments key={item._id} id={item._id} />



                                                        </div>

                                                    </div>
                                                </div>
                                                \

                                            </div>
                                        </>
                                    })
                                }
                            </div>
                        </div></div>
                    </> : <div className='text-black text-center text-xl'>
                        user Not Found
                        <NavLink to="/" className="capitalize underline text-blue-600"> go to feed </NavLink>

                    </div>}



            </div>) : <IsLoading />}

        </div>
    )
}

export default FindUser