import React, { createContext, useState } from 'react'
import axios from "../api/axios"
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate'


const BASE_URL = '/api/user'
const BASE_URL_PERSONAL = '/api/personalblogs'
const BASE_URL_blogs = '/api/blogs'
const BASE_URL_COMMENT = '/api/comment'


export const BlogsContext = createContext({})

export const BlogsProvider = ({ children }) => {
  const axiosPrivate = useAxiosPrivate()
  const { auth } = useAuth()
  const [blogs, setBlogs] = useState(null)
  const [userBlogs, setUserBlogs] = useState({})

  const [foundUser, setFoundUser] = useState({})
  const [foundUserName, setFoundUserName] = useState("")

  const getBlogs = async () => {
    try {
      const response = await axios.get(BASE_URL_blogs);
      setBlogs(response.data)
      console.log(response.data);

    } catch (err) {
      console.error(err);
    }
  }

  const getUserBlogs = async (id) => {
    try {
      const response = await axiosPrivate.get(`${BASE_URL}/${id}`);

      setUserBlogs(response.data)



    } catch (err) {
      console.error(err);
    }
  }
  const findUser = async () => {
    try {
      const response = await axiosPrivate.get(`${BASE_URL}/username/${foundUserName}`);

      setFoundUser(response.data)



    } catch (err) {
      setFoundUser({})
      console.error(err);
    }
  }



  const setLikedAndDisliked = async ({ current: { liked, disliked } }, blogId) => {

    try {
      const response = await axiosPrivate.patch(`${BASE_URL_PERSONAL}/like-dislike/${blogId}`, { like: liked, dislike: disliked });

      // getBlogs()

      setBlogs(blogs.map((itm) => {
        if (itm._id === response.data.response._id) {
          itm.liked = response.data.response.liked
          itm.disliked = response.data.response.disliked
          return itm
        }
        return itm;
      }))




    } catch (err) {
      setFoundUser({})
      console.error(err);
    }

  }



  return (
    <BlogsContext.Provider value={{ blogs, setBlogs, getUserBlogs, getBlogs, userBlogs, setUserBlogs, setFoundUser, foundUser, findUser, foundUserName, setFoundUserName, setLikedAndDisliked }}>
      {children}
    </BlogsContext.Provider>
  )
}

export default BlogsContext

