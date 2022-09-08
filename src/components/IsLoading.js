import React from 'react'

export const IsLoading = () => {
let circleCommonClasses = 'h-4 w-4 ml-1 bg-current rounded-full';

    return (
        <div className='flex justify-center mt-64 mb-2'>
            <div className='flex items-center content-center  '>
                <h1 className='text-2xl mr-1'>Loading</h1>
                <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
                <div
                    className={`${circleCommonClasses} mr-1 animate-bounce200`}
                ></div>
                <div className={`${circleCommonClasses} animate-bounce400`}></div>
            </div>
        </div>
    )
}
