import React, { useContext, useState } from 'react'
import { MdDrafts } from 'react-icons/md'
import { GoMention } from 'react-icons/go'
import { FcPrivacy } from 'react-icons/fc'
import { FaBlogger } from 'react-icons/fa'
import axios from 'axios'
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { BlogsContext } from '../context/BlogsProvider'

const BASE_URL = '/api/personalblogs'
const CreateBlog = () => {
    const privateRequest = useAxiosPrivate()
    const { auth } = useAuth()
    const { getBlogs, } = useContext(BlogsContext)
    const [pictures, setPictures] = useState([])

    const [isloading, setLoading] = useState(false)
    const [content, setContent] = useState("")
    const [draft, setDraft] = useState(false)


    const uploadImage = (files) => {
        const data = new FormData()

        Object.values(files).map((value) => {
            setLoading(true)
            data.append("upload_preset", "blogApp")
            data.append("file", value)
            data.append("cloud_name", "dwmm1r1ph")
            axios.post("https://api.cloudinary.com/v1_1/dwmm1r1ph/image/upload", data).then((res) => {
                setLoading(false)
                pictures.push(res.data.secure_url)
            })
                .catch((err) => console.log(err))
        })

    }

    const postBlog = async () => {
        try {

           await privateRequest.post(BASE_URL, {
                content, draft, pictures
            })
            getBlogs()
            setContent("")
            setPictures("")
            setDraft(false)

        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            {
                auth?.accessToken && <div style={{ marginLeft: "-165px" }} className={`${isloading ? "opacity-50" : "opacity-100"} flex justify-left items-center `} >

                    <div style={{ boxShadow: "1px 1px 20px #1354bd" }} className='mb-12 border-2 border-gray-300 py-4 px-6 mt-4 flex flex-col items-center text-left xl:w-fit lg:w-fit md:w-fit sm:w-72bg-white bg-white rounded-lg'>
                        <FaBlogger className='text-4xl text-gray-600' />
                        <div className='leading-7 flex items-center justify-center sm:flex-col '>

                            <br />
                            <div >
                                <textarea value={content} placeholder='Type your Blog or Article here..' onChange={(e) => setContent(e.target.value)} name="description" rows="4" cols="50" className='border-2 border-gray-400 xl:w-fit lg:w-fit md:w-fit sm:w-64 rounded-lg p-1'>

                                </textarea>
                            </div>
                            {isloading && <h1 className='text-4xl text-gray-500'>Loading....</h1>}

                            <br />
                            <div>
                                <span className='bg-blue-100 font-thin'>Upload</span>
                                <input onChange={(e) => uploadImage(e.target.files)} type='file' className='p-2 border-2 border-gray-400 m-2 xl:w-fit lg:w-fit md:w-fit sm:w-60' multiple />

                            </div>
                            <br />
                            <div onClick={() => setDraft(!draft)} className='flex items-center justify-between w-fit cursor-pointer'>
                                {!draft ? (<span>Save as Draft</span>) : (<span className='text-green-600'>Saved</span>)}
                                <MdDrafts className='text-2xl ml-1' />
                            </div>
                            <br />
                        </div>
                        <button onClick={postBlog} className={`py-1 px-4 text-xl bg-purple-700 text-white rounded-sm ${isloading && "cursor-not-allowed"}`}>
                            Upload
                        </button>
                    </div>

                </div>
            }

        </>
    )
}

export default CreateBlog