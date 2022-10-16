import React, { useState, useEffect, useContext, useRef } from "react"
import { TbSend } from "react-icons/tb"
import { BiCommentDetail, BiPencil } from "react-icons/bi"
import { RiDeleteBack2Fill, RiDeleteBin6Line } from "react-icons/ri"
import { AiOutlineLike, AiOutlineDislike, AiTwotoneDislike, AiFillLike } from "react-icons/ai"
import axios, { privateRequest } from "../api/axios"
import useAuth from "../hooks/useAuth"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import Comments from "./Comments"
import BlogsContext from "../context/BlogsProvider"
import IsLoading from "../components/IsLoading"
const BASE_URL_PERSONAL = '/api/personalblogs'
const BASE_URL_COMMENT = '/api/comment'


const Blogs = () => {

    const axiosPrivate = useAxiosPrivate()
    const { setBlogs, blogs, getBlogs, getCommentsCount, setLikedAndDisliked } = useContext(BlogsContext)

    const { auth } = useAuth()

    const likeDislike = useRef({
        liked: false,
        disliked: false
    })

    const [updatebox, setUpdatebox] = useState(false)
    const [updateId, setUpdateId] = useState("")
    const [newContent, setNewContent] = useState("")

    const [updateCmt, setUpdateCmt] = useState([])
    const [cmtCount, setCmtCount] = useState([])
    const [comment, setComment] = useState("")

    const changeContent = async () => {
        try {
            await axiosPrivate.patch(`${BASE_URL_PERSONAL}/${updateId}`, { newContent })
            setUpdatebox(false)
            getBlogs()
        } catch (error) {
            setUpdatebox(false)

            console.log(error);
        }

    }



    const addComment = async (blogId) => {
        try {
            const response = await axios.post(`${BASE_URL_COMMENT}/`, { content: comment, userId: auth.user.userId, blog: blogId })
            setComment("")

            const obj = cmtCount.find((i) => i[blogId])
            var value = obj && Object.values(obj)[0] + 1;
            obj[blogId] = value;

            setCmtCount(cmtCount.map(itm => {
                if (itm === obj) {
                    return obj
                }
                return itm
            }))


            setUpdateCmt(current => [...current, { cmt: response.data.comment, id: blogId }]);

        } catch (error) {

            console.log(error);
        }
    }



    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();



        getBlogs();

        return () => {
            isMounted = false;
            controller.abort();
        }



    }, [])









    const deleteBlog = async (id) => {
        try {
            await axiosPrivate.delete(`${BASE_URL_PERSONAL}/${id}`,);
            setBlogs(

                blogs.filter(blog =>
                    blog._id !== id)

            )

        } catch (err) {
            console.error(err);
        }
    }



    return (
        <>
            <div>
                {
                    updatebox && <div className="absolute  flex flex-col items-center justify-center border-4 bg-slate-300 w-full h-full m-0 left-0 right-0 top-0">
                        Enter Content
                        <input onChange={(e) => setNewContent(e.target.value)} types='text' className="h-fit text-xl w-80 " />
                        <button onClick={() => changeContent()} className="bg-green-700 text-white p-2 mt-5">Update Content</button>
                    </div>
                }
            </div>
            <div className='flex flex-col items-center xl:w-144 lg:w-128 md:w-96 sm:w-80 '>


                {
                    blogs?.length ?

                        blogs?.map(item => {
                            return <>
                                <div key={item._id} className={` ${updatebox ? "hidden" : "visible"} p-2 flex flex-col items-stretch w-full h-full text-center my-8 bg-gray-100 transition rounded-xl shadow-black shadow-xl `} >
                                    <div className=' w-full bg-amber-100 flex justify-around items-center flex-wrap px-2'>
                                        {item.user === auth?.user?.userId &&
                                            <div className="m-3 w-fit text-left text-white rounded-xl flex justify-start items-center">
                                                <BiPencil onClick={() => {
                                                    setUpdateId(item._id)
                                                    setUpdatebox(true)
                                                }} className="text-2xl cursor-pointer text-black mr-5" />
                                                <RiDeleteBin6Line onClick={() => deleteBlog(item._id)} className="text-2xl cursor-pointer text-white bg-black" />
                                            </div>}
                                        <div className='font-bold text-lg break-words flex-1'>@{item.username}</div>
                                        <div className='font-bold text-sm ml-8'>{item.createdAt}</div>

                                    </div>


                                    <div className='p-4 flex flex-col justify-center text-left w-full bg-slate-300-100 '>


                                        <br />
                                        <div className='text-lg text-left break-words border-2 border-gray-200 p-2'>{item.content}</div>


                                        <div className='flex flex-wrap justify-center items-center p-4'>
                                            {item?.pictures?.map(item => {
                                                return <img key={item._id + Math.random(Math.floor(9) * 100)} src={item} className=' hover:scale-125  transition w-52 h-52 m-1' />
                                            })}

                                        </div>
                                        <br />
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <div className='flex text-left justify-between mb-4'>
                                            <div
                                                onClick={() => {
                                                    likeDislike.current = { liked: true, disliked: false }
                                                    setLikedAndDisliked(likeDislike, item._id)
                                                }}
                                                className='text-4xs mx-4 flex justify-center items-center'><h1 className="text-green-600 text-2xl font-bold">{item?.liked?.length}</h1>
                                                {item?.liked?.find((itm) => itm === auth?.user?.userId) ? <div className=" hover:animate-pulse transition delay-700 p-2 "> <AiFillLike className=' text-4xl' /></div> : <div className=" hover:animate-pulse transition delay-700  p-2 "><AiOutlineLike className=' text-4xl' /></div>}
                                            </div>
                                            <div
                                                onClick={() => {
                                                    likeDislike.current = { liked: false, disliked: true }

                                                    setLikedAndDisliked(likeDislike, item._id)
                                                }}

                                                className='text-4xs mx-4  flex justify-center items-center'><h1 className="text-red-600 text-2xl font-bold">{item?.disliked?.length}</h1>
                                                {item?.disliked?.find((itm) => itm === auth?.user?.userId) ? (
                                                    <div className="hover:animate-pulse transition delay-700 p-2 "><AiTwotoneDislike className='text-4xl' /></div>) : (<div className="hover:animate-pulse transition delay-700 p-2"> <AiOutlineDislike className=' text-4xl' /></div>)}
                                            </div>
                                            <div className='text-xs mx-4 flex justify-center items-center'><h1 className="text-blue-600 font-bold text-2xl">{(() => {

                                                var obj = cmtCount.find((i) => i[item._id])
                                                return obj && Object.values(obj)[0]

                                            })()}</h1><BiCommentDetail className='text-4xl' /></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <div className='px-32 p-4 pb-0 xl:w-128 lg:w-128 md:w-96 sm:w-72 h-96 flex flex-col justify-end items-center '>
                                            <div className='overflow-y-scroll scrollbar-hide mb-1 xl:w-128 lg:w-128 md:w-96 sm:w-80   '>



                                                <Comments cmtCount={cmtCount} setCmtCount={setCmtCount} update={updateCmt} cmt={comment} setUpdate={setUpdateCmt} key={item._id} id={item._id} />



                                            </div>
                                            {auth?.accessToken &&
                                                <div className='bg-blue-800 shadow-gray-700 mb-4 flex items-center shadow xl:w-96 lg:w-92 md:w-80 sm:w-72 justify-center px-2'>
                                                    <input value={comment} onChange={(e) => setComment(e.target.value)} type='text' placeholder='wow! Amazing Stuff' className='xl:w-144 lg:w-128 md:w-96 sm:w-64 p-2 shadow-lg h-12 rounded-full text-center' /> <TbSend className='text-6xl text-white ml-2 rounded-full' onClick={() => addComment(item._id)} />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </>
                        }) : (<div className="bg-white h-fit"><IsLoading /></div>)
                }


            </div>
        </>
    )
}

export default Blogs