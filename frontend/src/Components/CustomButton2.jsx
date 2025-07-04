import React from 'react'

const CustomButton2 = ({title, handleClick}) => {
  return (
    <button onclick={handleClick} className='w-1/3 flex items-center justify-center my-4 py-2 rounded bg-orange-500 text-white mx-auto'>
        {title}
    </button>
  )
}

export default CustomButton2;