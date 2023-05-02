import React, { useContext, useEffect, useState } from 'react'
import Blogs from '../components/Blogs'
import { FaUserAstronaut } from "react-icons/fa"
import { BsPlusCircle } from "react-icons/bs"
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import axios from 'axios'

import { BiCommentDetail, BiPencil } from "react-icons/bi"
import { RiDeleteBack2Fill, RiDeleteBin6Line } from "react-icons/ri"
import BlogsContext from '../context/BlogsProvider'

const BASE_URL_PERSONAL = '/api/personalblogs'
const BASE_URL_user = '/api/user'




// const uploadPic = async () => {



// }
const Profile = () => {

  const { auth, setAuth } = useAuth()
  const { getUserBlogs, userBlogs, setUserBlogs } = useContext(BlogsContext)
  const [like, setLike] = useState(false)
  const [updatebox, setUpdatebox] = useState(false)
  const [updateId, setUpdateId] = useState(false)
  const [isloading, setLoading] = useState(false)
  const [newContent, setNewContent] = useState("")

  const axiosPrivate = useAxiosPrivate()

  const uploadImage = (imgs) => {
    const data = new FormData()


    setLoading(true)
    data.append("upload_preset", "blogApp")
    data.append("file", imgs[0])
    data.append("cloud_name", "dwmm1r1ph")
    axios.post("https://api.cloudinary.com/v1_1/dwmm1r1ph/image/upload", data).then((res) => {
      setLoading(false)

      updateProfile(res.data.secure_url)
    })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })

  }


  const updateProfile = async (img) => {
    try {
      const ress = await axiosPrivate.patch(`${BASE_URL_user}/${auth.user.userId}`, { picture: img })
      setAuth(prev => ({ ...prev, img: ress.data.user.picture }))
      getUserBlogs(auth.user.userId)


    } catch (error) {
      // setUpdatebox(false)

      console.log(error);
    }

  }
  const updateBlog = async () => {
    try {
      await axiosPrivate.patch(`${BASE_URL_PERSONAL}/${updateId}`, { newContent })
      setUpdatebox(false)
      getUserBlogs(auth.user.userId)

    } catch (error) {
      setUpdatebox(false)

      console.log(error);
    }

  }



  const deleteBlog = async (id) => {
    try {
      await axiosPrivate.delete(`${BASE_URL_PERSONAL}/${id}`,);
      // setUserBlogs(

      //   userBlogs.blogs.filter(blog =>
      //     blog._id == id)
      // )

      getUserBlogs(auth.user.userId)


    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    getUserBlogs(auth.user.userId)

    return () => {
      isMounted = false;
      controller.abort();
    }



  }, [])





  return (

    <div className='bg-slate-900 bg-opacity-90'>
      <div className='flex justify-center flex-col items-center '>
        <div style={{ boxShadow: "1px 1px 8px #3333" }} className='overflow-hidden w-80 h-80'>
          <label for="upload-photo">
            <BsPlusCircle className=' absolute ml-14 top-80 mt-6 text-5xl bg-amber-50 rounded-full' />
          </label>
          {isloading && <h1 className='text-4xl text-red-600'>Loading....</h1>}
          <input onChange={(e) => uploadImage(e.target.files)} className='opacity-0' type="file" name="photo" id="upload-photo" />
          {!userBlogs?.picture ? (
            <img src='https://res.cloudinary.com/dwmm1r1ph/image/upload/v1669314631/blogApp/oixf4ghlv1xjaji40gjr.png' className='text-6xl text-white ml-28' />

          ) : (
            <div className={`${isloading ? "cursor-not-allowed opacity-30" : "cursor-auto opacity-100"} flex justify-center items-center`}>
              <img src={userBlogs?.picture} className='rounded-full bg-auto border-blue-600 w-52 h-52 ' />
            </div>
          )}

        </div>
        <div className='mt-2 inline-block text-lg text-left text-white'>
          <div>{auth?.user?.username}</div>
          <div>{auth?.user?.fullname}</div>
          <div>{auth?.user?.gmail}</div>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <h2 className='bg-slate-300 text-2xl px-5'>Your Blogs</h2>
        <br />
        <p className='text-blue-500'> Create Update and Delete Your Blogs </p>
        {
          userBlogs?.blogs?.map(item => {
            return <>
              <div>
                {
                  updatebox && <div className="absolute  flex flex-col items-center justify-center border-4 bg-slate-300 w-full h-full m-0 left-0 right-0 top-0">
                    Enter Content
                    <input onChange={(e) => setNewContent(e.target.value)} types='text' className="h-fit text-xl w-80 p-2" />
                    <button onClick={() => updateBlog()} className="bg-green-700 text-white p-2 mt-5">Update Content</button>
                  </div>
                }
              </div>
              <div key={item._id} className={`${updatebox ? "hidden" : "visible"} bg-gray-200 rounded-xl shadow-black shadow-xl flex flex-col items-stretch max-w-xl text-center  my-8 transition`} >
                <div className=' w-full bg-amber-100 flex justify-between items-center px-6'>
                  {item.user === auth.user.userId &&
                    <div style={{ marginLeft: "-22px" }} className="m-3 w-fit text-left text-white rounded-xl flex justify-start items-center">
                      <BiPencil onClick={() => {
                        setUpdateId(item._id)
                        setUpdatebox(true)
                      }} className="text-2xl cursor-pointer text-black mr-5" />
                      <RiDeleteBin6Line onClick={() => deleteBlog(item._id)} className="text-2xl cursor-pointer text-white bg-black" />
                    </div>}
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
  )
}

export default Profile