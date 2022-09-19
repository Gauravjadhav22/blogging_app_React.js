import React, { createContext, useContext, useState } from 'react'
import axios from "../api/axios"
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import BlogsContext from './BlogsProvider'



const BASE_URL_COMMENT = '/api/comment'


export const CommentContext = createContext({})

export const CommentsProvider = ({ children }) => {
    const { auth } = useAuth()

    const [comments, setComments] = useState([])

    const deletComment = async (id) => {
        try {

            setComments(
                comments.filter(item =>
                    item._id !== id)
            )
      
            await axios.delete(`${BASE_URL_COMMENT}/${id}`,)


        } catch (err) {
        }
    }


    const addComment = async (blogId,comment) => {
        try {
            const response = await axios.post(`${BASE_URL_COMMENT}/`, { content: comment, userId: auth.user.userId, blog: blogId })
            

            setComments(current => [...current, response.data.comment]);

        } catch (error) {

            console.log(error);
        }
    }

    const getComments = async (BlogId) => {
        try {
            const response = await axios.get(`${BASE_URL_COMMENT}/${BlogId}`,)
            // isMounted &&
            setComments(response.data);;


        } catch (err) {
        }
    }

    return (
        <CommentContext.Provider value={{getComments,deletComment,addComment,comments}}>
            {children}
        </CommentContext.Provider>
    )
}

export default CommentContext

