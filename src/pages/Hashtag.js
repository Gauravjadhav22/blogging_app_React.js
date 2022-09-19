import React, { useContext } from 'react'
import Hashtags from '../components/Hashtags'
import BlogsContext from '../context/BlogsProvider'

const Hashtag = () => {
  const { userBlogs, foundUser, findUser } = useContext(BlogsContext)
  return (
    <div>
      <Hashtags/>
      
    </div>
  )
}

export default Hashtag