import React from 'react'

export default function CustomButton({handleClick, text=""}) {
  return (
    <>
      <button onClick={handleClick}>
        <div className='group w-28 md:w-32 md:h-14 h-12 font-bold p-1 relative'>
            <div className='w-11/12 h-4/5 bg-bgBlue group-hover:bg-yellow-500 duration-500 absolute right-0 bottom-0'></div>
            <div className='w-11/12 h-4/5 bg-blue-800 group-hover:bg-gradient-to-r from-blue-700 to-bgBlue duration-500 absolute left-0 top-0 text-xs md:text-sm text-white flex flex-row items-center justify-center'>{text !== "" ? text : 'Check it Out'}<i className='bx bx-right-arrow-alt ml-1'></i></div>
        </div>
      </button>
    </>
  )
}
