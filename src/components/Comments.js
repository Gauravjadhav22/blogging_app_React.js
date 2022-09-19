import React, { useState, useEffect, useContext, useRef } from 'react'
import { RiDeleteBack2Fill, RiDeleteBin6Line } from "react-icons/ri"
import axios from '../api/axios'
import useAuth from '../hooks/useAuth'

const BASE_URL_COMMENT = '/api/comment'
const Comments = ({ id, update, setUpdate }) => {

    const { auth } = useAuth()
    const [comments, setComments] = useState([])

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getComments = async () => {
            try {
                const response = await axios.get(`${BASE_URL_COMMENT}/${id}`,)
                // isMounted &&
                setComments(response.data);;


            } catch (err) {
            }
        }

        getComments();

        return () => {
            isMounted = false;
            controller.abort();
        }



    }, [])




    const deletComment = async (id) => {
        try {

            setComments(
                comments.filter(item =>
                    item._id !== id)
            )
            setUpdate(
                update.filter(item =>
                    item._id !== id)
            )

            await axios.delete(`${BASE_URL_COMMENT}/${id}`,)


        } catch (err) {
        }
    }


    return (
        <>





            {


                comments?.map(item => {
                    return (
                        <div key={item._id}  className='transition p-3 bg-gray-300 break-words m-5 rounded-lg shadow-blue-400 shadow-lg ' >
                            {item.content}
                            <br />
                            <div className='flex justify-end items-center font-bold text-red-800 mt-2 w-fit'>
                                {


                                    auth?.user?.userId === item.userId && <div className='cursor-pointer flex items-center' onClick={() => deletComment(item._id)}> <span className='text-xs'>Delete</span><RiDeleteBack2Fill className='text-2xl' />

                                    </div>
                                }
                                {
                                }

                                <div>

                                    <span className='ml-6 xl:ml-14 text-black text-xs text-right'>{item.createdAt}</span>
                                </div>
                            </div>
                        </div>
                    )
                })



            }
            {

                update?.map(item => {
                    return (
                        <div key={item._id} style={{ boxShadow: "1px 1px 5px #333 " }} className='transition p-3 bg-gray-100 break-words m-5 rounded-sm' >
                            {item.content}
                            <br />
                            <div className='flex justify-end items-center font-bold text-red-800 mt-2 w-fit'>
                                {


                                    auth?.user?.userId === item.userId && <div className='cursor-pointer flex items-center' onClick={() => deletComment(item._id)}> <span className='text-xs'>Delete</span><RiDeleteBack2Fill className='text-2xl' />

                                    </div>
                                }
                                {
                                }

                                <div>

                                    <span className='ml-6 xl:ml-14 text-black text-xs text-right'>{item.createdAt}</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }


        </>
    )

}
export default Comments


