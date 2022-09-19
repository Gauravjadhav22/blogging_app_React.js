import React, { useState, useEffect, useContext, useRef } from 'react'
import { RiDeleteBack2Fill, RiDeleteBin6Line } from "react-icons/ri"
import axios from '../api/axios'
import useAuth from '../hooks/useAuth'

const BASE_URL_COMMENT = '/api/comment'
const Comments = ({ id, update, setUpdate }) => {

console.log(update);

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
                        id===item.id  &&    <div key={item._id} className='transition p-3 bg-gray-300 break-words m-5 rounded-lg shadow-blue-300 shadow-lg '>
                            {item?.cmt?.content}
                            <br />
                            <div className='flex justify-end items-center font-bold text-red-800 mt-2 w-fit'>
                                {


                                    auth?.user?.userId === item?.cmt?.userId && <div className='cursor-pointer flex items-center' onClick={() => deletComment(item._id)}> <span className='text-xs'>Delete</span><RiDeleteBack2Fill className='text-2xl' />

                                    </div>
                                }
                                {
                                }

                                <div>

                                    <span className='ml-6 xl:ml-14 text-black text-xs text-right'>{item?.cmt?.createdAt}</span>
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


