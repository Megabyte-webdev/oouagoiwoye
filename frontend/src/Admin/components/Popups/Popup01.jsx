import React from 'react';

import { FaTimes } from "react-icons/fa";

export default function Popup01({close, id}) {
  return (
    <div className='w-full h-full absolute top-0 left-0 bg-white bg-opacity-80 backdrop-blur-md' onClick={close}>
        <FaTimes className='absolute top-10 right-10 text-3xl' />
		<h1 className='text-center text-deep mt-5 text-3xl font-semibold'>Update Campus</h1>
        <div className='w-full p-10 grid grid-cols-2 gap-7 mx-auto '>
            <div className='w-full h-full overflow-auto'>
				<form action="" className='w-full font-sans p-5 shadow-xl rounded-lg'>
					<p className='font-semibold text-xl text-center mb-5'>Update Campus Details</p>
					<div className='flex flex-row items-center font-semibold my-2'>
						<label htmlFor="title" className='mr-3 w-2/12'>Title:</label>
						<input type="text" name='title' placeholder='Enter campus title' className='border-thin shadow-md focus:outline-none p-1 rounded-md w-9/12'/>
					</div>
					<div className='flex flex-row items-center font-semibold my-2'>
						<label htmlFor="campusInfo" className='mr-3 w-2/12'>campus History:</label>
						<input type="text" name='campusInfo' id='campusInfo' placeholder='Enter campus information' className='border-thin shadow-md focus:outline-none p-1 rounded-md w-9/12'/>
					</div>
					<button className='p-1 px-5 w-10/12 my-5 hover:shadow-xl bg-orange-500 text-white rounded-md flex flex-row items-center justify-center mx-auto'>Update </button>
				</form>

				<form action="" encType='multipart/form-data' className='w-full font-sans p-5 shadow-xl rounded-lg mt-5'>
					<p className='font-semibold text-xl text-center mb-5'>Update Campus image</p>
					<div className='flex flex-row items-center font-semibold my-2'>
						<label htmlFor="image" className='mr-3 w-2/12'>Image:</label>
						<input type="file" name='image' className='border-thin shadow-md focus:outline-none p-1 rounded-md w-9/12'/>
					</div>
					<button className='p-1 px-5 w-10/12 my-5 hover:shadow-xl bg-orange-500 text-white rounded-md flex flex-row items-center justify-center mx-auto'>Update </button>
				</form>

				
			</div>

			<div className='col-span-1' >
				<form action="" className='w-full font-sans p-5 shadow-xl rounded-lg'>
					<p className='font-semibold text-xl text-center mb-5'>Update Campus Contact</p>
					<div className='flex flex-row items-center font-semibold my-2'>
						<label htmlFor="whatsapp" className='mr-3 w-2/12'>whatasapp:</label>
						<input type="text" name='whatsapp' placeholder='Enter whatsapp link' className='border-thin shadow-md focus:outline-none p-1 rounded-md w-9/12'/>
					</div>
					<div className='flex flex-row items-center font-semibold my-2'>
						<label htmlFor="facebook" className='mr-3 w-2/12'>Facebook:</label>
						<input type="text" name='facebook' id='facebook' placeholder='Enter facebook link here' className='border-thin shadow-md focus:outline-none p-1 rounded-md w-9/12'/>
					</div>
					<div className='flex flex-row items-center font-semibold my-2'>
						<label htmlFor="youtube" className='mr-3 w-2/12'>Youtube:</label>
						<input type="text" name='youtube' id='youtube' placeholder='Enter youtube link here' className='border-thin shadow-md focus:outline-none p-1 rounded-md w-9/12'/>
					</div>
					<button className='p-1 px-5 w-10/12 my-5 hover:shadow-xl bg-orange-500 text-white rounded-md flex flex-row items-center justify-center mx-auto'>Update </button>
				</form>

				<form action="" className='w-full font-sans p-5 shadow-xl rounded-lg'>
					<p className='font-semibold text-xl text-center mb-5'>Create Faculty in Campus</p>
					<div className='flex flex-row items-center font-semibold my-2'>
						<label htmlFor="title" className='mr-3 w-2/12'>Title:</label>
						<input type="text" name='title' placeholder='Enter campus title' className='border-thin shadow-md focus:outline-none p-1 rounded-md w-9/12'/>
					</div>
					<div className='flex flex-row items-center font-semibold my-2'>
						<label htmlFor="campusInfo" className='mr-3 w-2/12'>campus History:</label>
						<input type="text" name='campusInfo' id='campusInfo' placeholder='Enter campus information' className='border-thin shadow-md focus:outline-none p-1 rounded-md w-9/12'/>
					</div>
					<button className='p-1 px-5 w-10/12 my-5 hover:shadow-xl bg-orange-500 text-white rounded-md flex flex-row items-center justify-center mx-auto'>Update </button>
				</form>
			</div>
        </div>
        
    </div>
  )
}
