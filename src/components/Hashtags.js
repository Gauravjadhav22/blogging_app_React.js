import React from 'react'
import { Link } from 'react-router-dom'

const Hashtags = () => {
    const data = [2, 8, 4, 5, 4, 5, 8, 7, 4, 9, 45, 45, 87]
    return (
        <>
            <div style={{marginLeft:"-175px"}} className=' m-2 w-25 flex flex-col justify-center items-center bg-white'>
                <h5 className='text-center mb-2'>Select Hashtags for topics</h5>
                <div className='p-4 text-xl border-2 border-gray-300 w-144 h-fit text-blue-600 xl:w-144 lg:w-128 md:w-96 sm:w-72'>

                    {
                        data.map(item => {
                            return <Link to={`/hashtag#${item}`} className='hover:underline cursor-pointer m-2' key={Math.random(10)}>#fksfs{item} </Link>
                        })
                    }



                </div>
            </div></>
    )
}

export default Hashtags