import React from 'react'

  const IsLoading = () => {
let circleCommonClasses = 'h-4 w-4 ml-1 bg-green-600 rounded-full';

    return (
        <div className='flex justify-center px-2 m-auto mt-44 mb-2 bg-white w-fit rounded-xl'>
            <div className='flex items-center content-center  '>
                <h1 className='text-2xl mr-1'>Loading</h1>
                <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
                <div
                    className={`${circleCommonClasses} mr-1 animate-bounce 200`}
                ></div>
                <div className={`${circleCommonClasses} animate-bounce 400`}></div>
            </div>
        </div>
    )
}

export default IsLoading