import React, { useContext, useEffect, useState } from 'react'
import { FaUserAstronaut } from "react-icons/fa"
import useAuth from '../hooks/useAuth'

import BlogsContext from '../context/BlogsProvider'


const FindUser = () => {

    const { auth } = useAuth()
    const { userBlogs, foundUser, findUser } = useContext(BlogsContext)
    const [updatebox, setUpdatebox] = useState(false)

    useEffect(() => {
        findUser()
        return () => {

        }
    }, [])



    return (

        <div className='main'>
            {foundUser?.username ? <> <div className='flex justify-center flex-col items-center my-8'>
                <div style={{ boxShadow: "1px 1px 8px #3333" }} className='overflow-hidden p-3 w-80 h-80'>

                    {!userBlogs?.picture ? (
                        <FaUserAstronaut className='border-4 border-gray-500 rounded-full bg-black text-6xl ml-28 text-white' />

                    ) : (
                        <div className='flex justify-center items-center'>
                            <img src={foundUser?.picture} />
                        </div>
                    )}

                </div>
                <div className='mt-2 inline-block text-lg text-left text-white'>
                    <div>{foundUser?.username}</div>
                    <div>{foundUser?.fullname}</div>
                    <div>{foundUser?.gmail}</div>
                </div>
            </div>
                <div className='flex flex-col justify-center items-center'>
                    <h2 className='bg-slate-300 text-2xl px-5'>{foundUser?.username}'s Blogs</h2>
                    <br />
                    <div className='flex flex-col items-center xl:w-144 lg:w-128 md:w-96 sm:w-80  '>

                        {

                            foundUser?.blogs?.map(item => {
                                return <>

                                    <div key={item._id} style={{ boxShadow: "2px 2px 8px #fff " }} className={`${updatebox ? "hidden" : "visible"}px-2 flex flex-col items-stretch bg-white w-full h-full border-2 border-blue-500 text-center my-8 transition`} >
                                        <div className=' w-full bg-amber-100 flex justify-between items-center px-4'>

                                            <div className='font-bold text-lg '>@{item.username}</div>
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
                                        <div className="flex justify-center items-center">

                                        </div>

                                    </div>
                                </>
                            })
                        }
                    </div>
                </div>
            </> : <div className='text-white text-center text-xl'>
                user Not Found
                
            </div>}



        </div>
    )
}

export default FindUser