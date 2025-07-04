import React from 'react'

const FormInput = ({title, type, name, placeholder, onchange, value}) => {
  return (
    <div className='flex flex-row items-center font-semibold my-2'>
        <label htmlFor={name} className='mr-3 w-3/12'>{title}:</label>
        <input type={type} name={name} id={name} placeholder={placeholder} value={value} className='border-thin shadow-md focus:outline-none p-1 rounded-md w-8/12' onChange={onchange}/>
    </div>
  )
};;

export default FormInput