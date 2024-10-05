import React from 'react'
import { FaPlus } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { BsTrashFill } from "react-icons/bs";

export default function All() {
  return (
    <div className='w-full h-full grid grid-cols-2 gap-7'>
        <div className='flex flex-col justify-center items-center font-sans rounded-md p-5 shadow-xl border-thin'>
            <p className='font-semibold text-2xl mb-3'>Create Campus</p>
            <form action="" encType='multipart/form-data' className='w-full font-sans p-5'>
                <div className='flex flex-row items-center font-semibold my-2'>
                    <label htmlFor="title" className='mr-3 w-2/12'>Title:</label>
                    <input type="text" name='title' placeholder='Enter campus title' className='border-thin shadow-md focus:outline-none p-1 rounded-md w-9/12'/>
                </div>
                <div className='flex flex-row items-center font-semibold my-2'>
                    <label htmlFor="image" className='mr-3 w-2/12'>Image:</label>
                    <input type="file" name='image' className='border-thin shadow-md focus:outline-none p-1 rounded-md w-9/12'/>
                </div>
                <div className='flex flex-row items-center font-semibold my-2'>
                    <label htmlFor="campusInfo" className='mr-3 w-2/12'>campus History:</label>
                    <input type="text" name='campusInfo' id='campusInfo' placeholder='Enter campus information' className='border-thin shadow-md focus:outline-none p-1 rounded-md w-9/12'/>
                </div>
                <button className='p-1 px-5 w-10/12 my-5 hover:shadow-xl bg-orange-500 text-white rounded-md flex flex-row items-center justify-center mx-auto'>Create <FaPlus className='ml-2 text-base text-white font-bold' /></button>
            </form>
        </div>
        <div className=' flex flex-col justify-center items-center font-sans'>
            <p className='font-semibold text-2xl my-3'>Campus list</p>
            <div className='w-full h-full'>
                <div className='w-full flex flex-row items-center font-semibold bg-bgBlue text-white p-2'>
                    <span className='mr-12 w-1/12'>No.</span>
                    <span className='mr-3 w-2/5'>campus</span>
                    <span className='mr-3'>Faculties</span>
                </div>
                <div className='w-full flex flex-row items-center justify-between font-semibold text-black hover:bg-blue-600 hover:text-white pr-3'>
                    <span className='mr-3 w-1/12 py-2'>1.</span>
                    <span className='mr-3 w-3/12 py-2'>Main Campus</span>
                    <span className='mr-3 py-2'>10</span>
                    <CiEdit className='hover:text-deep hover:cursor-pointer' />
                    <BsTrashFill className='hover:text-deep hover:cursor-pointer' />
                </div>
            </div>
        </div>
    </div>
  )
}
