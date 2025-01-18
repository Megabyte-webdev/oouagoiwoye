import React from 'react'
import { FaPlus } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { BsTrashFill } from "react-icons/bs";
import Popup01 from '../Popups/Popup01';
export default function Campuses() {
    const [pop, setPop] = React.useState(false);
    const [id, setId] = React.useState(null);
    const handleClick = () => setPop(!pop);

    
    return (
        <div className='w-full h-full grid grid-cols-2 gap-7'>
            <div className='flex flex-col justify-center items-center font-sans rounded-md p-5 shadow-xl border-thin'>
                <p className='font-semibold text-2xl mb-3'>Create Campus</p>
                <form
                    action=""
                    encType="multipart/form-data"
                    className="w-full font-sans p-5"
                    onSubmit={(e) => e.preventDefault()}
                >

                    {/* Title */}
                    <div className="flex flex-row items-center font-semibold my-3">
                        <label htmlFor="title" className="mr-3 w-3/12">
                            Title:
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter campus title"
                            className="border-thin shadow-md focus:outline-none p-2 rounded-md w-9/12"
                        />
                    </div>

                    <div className='flex flex-row items-center font-semibold my-2'>
                        <label htmlFor="image" className='mr-3 w-2/12'>Image:</label>
                        <input type="file" name='image' className='border-thin shadow-md focus:outline-none p-1 rounded-md w-9/12' />
                    </div>


                    {/* Campus History */}
                    <div className="flex flex-row items-center font-semibold my-3">
                        <label htmlFor="campusInfo" className="mr-3 w-3/12">
                            Campus History:
                        </label>
                        <input
                            type="text"
                            name="campusInfo"
                            placeholder="Enter campus information"
                            className="border-thin shadow-md focus:outline-none p-2 rounded-md w-9/12"
                        />
                    </div>

                    {/* Campus Location */}
                    <div className="flex flex-row items-center font-semibold my-3">
                        <label htmlFor="campusLocation" className="mr-3 w-3/12">
                            Location:
                        </label>
                        <input
                            type="text"
                            name="campusLocation"
                            placeholder="Enter campus location"
                            className="border-thin shadow-md focus:outline-none p-2 rounded-md w-9/12"
                        />
                    </div>

                    <button
                        className="p-2 px-5 w-full my-5 hover:shadow-xl bg-orange-500 text-white rounded-md flex flex-row items-center justify-center mx-auto"
                        type="submit"
                    >
                        Create <FaPlus className="ml-2 text-base text-white font-bold" />
                    </button>

                </form>
            </div>
            <div className=' flex flex-col justify-center items-center font-sans'>
                <p className='font-semibold text-2xl my-3'>Campus list</p>
                <div className='w-full h-full'>
                    <div className='w-full grid grid-cols-12 gap-4 font-semibold bg-bgBlue text-white p-2'>
                        <span className=' col-span-1'>No.</span>
                        <span className=' col-span-4 text-center'>campus</span>
                        <span className=' col-span-3 text-center'>Faculties</span>
                        <span className=' col-span-4 text-center' >Actions</span>
                    </div>
                    <div className='w-full grid grid-cols-12 gap-4 text-black hover:bg-blue-600 duration-500 hover:text-white p-2'>
                        <span className='col-span-1 py-2 text-center'>1.</span>
                        <span className='col-span-4 py-2 text-center'>Main Campus</span>
                        <span className='col-span-3 py-2 text-center'>10</span>
                        <div className='col-span-4 flex flex-row items-center justify-around'>
                            <CiEdit className='text-4xl bg-white text-deep cursor-pointer hover:text-deep rounded-full p-2' onClick={() => { setPop(true); setId("") }} />
                            <BsTrashFill className='text-4xl bg-white text-red-600 cursor-pointer hover:text-red-600 rounded-full p-2' />
                        </div>
                    </div>
                </div>
            </div>
            {pop ? <Popup01 close={handleClick} id={id} /> : null}
        </div>
    )
}
