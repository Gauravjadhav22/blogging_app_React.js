import React, { useState, useEffect, useContext, useRef } from 'react'
import { RiDeleteBack2Fill, RiDeleteBin6Line } from "react-icons/ri"
import axios from '../api/axios'
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

const BASE_URL_COMMENT = '/api/comment'
const Comments = ({ id, update, setUpdate, setCmtCount, cmtCount }) => {


    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const [comments, setComments] = useState([])

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getComments = async () => {
            try {
                const response = await axios.get(`${BASE_URL_COMMENT}/${id}`,)
                // isMounted &&
                setComments(response.data);;
                const obj = {

                }
                obj[id] = response.data.length
                setCmtCount((prev) => [...prev, obj])






            } catch (err) {
            }
        }

        getComments();

        return () => {
            isMounted = false;
            controller.abort();
        }



    }, [])




    const deletComment = async (commentId) => {
        try {

            const obj = cmtCount.find((i) => i[id])
            var value = obj && Object.values(obj)[0] - 1;
            obj[id] = value;

            setCmtCount(cmtCount.map(itm => {
                if (itm === obj) {
                    return obj
                }
                return itm
            }))


            setComments(
                comments.filter(item =>
                    item._id !== commentId)
            )
            setUpdate(
                update.filter(item =>
                    item._id !== commentId)
            )

            await axiosPrivate.delete(`${BASE_URL_COMMENT}/${commentId}`)



        } catch (err) {
            console.log(err);
        }
    }


    return (
        <>



            {


                comments?.map(item => {
                    return (
                        <div key={item._id} className='transition p-3 bg-slate-200 break-words m-5 rounded-lg shadow-green-300 shadow-md ' >
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
                        id === item.id && <div key={item._id} className='transition p-3 bg-slate-200 break-words m-5 rounded-lg  shadow-green-300 shadow-lg '>
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


