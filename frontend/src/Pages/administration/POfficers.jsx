import React, { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { principalData } from '../../Data/administration'

import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs } from '@mui/material';
import assets from '../../assets/assets';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { FaAsterisk, FaFacebookSquare, FaYoutube } from 'react-icons/fa';
import { MetaHelmet } from '../../Components/PageAttributes';

const POfficers = () => {
    const {id} = useParams()
    const check = principalData.find(item => item.title === id)
    const [data, setData] = useState();
    const navigate = useNavigate()
    function handleClick(event) {
        event.preventDefault();
        navigate('/administration/principal-officers')
    }
    
    useEffect(() => {
        if (check) {
            setData(check)
        } else {
            navigate('/notfound')
        }
    }, [id, check])


    const breadcrumbs = [
        <p key={1} className='text-slate-500 text-xs lg:text-base' >
            Administration
        </p>,
        <a className='text-slate-500 cursor-pointer text-xs lg:text-base' key={2} onClick={handleClick} >
            Principal Officers
        </a>,
        <p key={3} className='text-blue-500 text-xs lg:text-base' >
            {data?.title}
        </p>,
      ];
      
  return (
    <>
    <MetaHelmet title={data?.title || "Principal Officer"} />
    {data &&
    <div className='w-full h-auto lg:min-h-[calc(100vh-150.39px)] font-sans'>
        <div className='p-2 px-4 bg-white'>
            {/* breadcrumbs */}
            <Stack spacing={1}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
            </Stack>
            <div className="relative w-full flex items-center justify-center min-h-20">
    {/* Background Image */}
    <img 
        src={assets.wireframe} 
        alt="Background" 
        className="absolute w-full h-full z-0 object-cover" 
    />
    {/* Title */}
    <h2 className="relative text-blue-700 text-lg sm:text-xl lg:text-2xl xl:text-4xl font-semibold z-10 text-center px-4">
        {data?.title}
    </h2>
</div>
            
        </div>
        

        <div className='mx-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 relative'>
            
            <div className='w-full lg:col-span-3 md:col-span-2'>
                <div className='w-full'>
                    <h2 className='text-blue-800 font-bold text-lg lg:text-2xl mt-2'>Brief Biography</h2>
                    <p className='mt-2 leading-7 text-sm'>
                        {data?.biography}
                    </p>
                </div>
                <div className='w-full'>
                    <h2 className='text-blue-800 font-bold text-lg lg:text-2xl mt-2'>Role and Responsibilities</h2>
                    <div className='mt-1  text-sm'>
                        {data?.roles.map((ele, index)=>(
                            <div key={index} className='flex items-start'>
                                <FaAsterisk className='text-blue-900 text-sm  mt-2' /> <span className='text-sm my-1 ml-2 text-slate-700 font-sans'>{ele}</span>
                            </div>
                        ))}
                    
                    </div>
                </div>
                <div className='w-full'>
                    <h2 className='text-blue-800 font-bold text-lg lg:text-2xl mt-2'>Contact Information</h2>
                    <div className='mt-1 mb-4'>
                        <div className='flex items-center justify-between w-2/5 lg:w-3/12'>
                            <a href=""><IoLogoWhatsapp className=' text-4xl text-green-500 border-green-500 p-2 border-thin rounded-full'/></a>
                            <a href=""><FaFacebookSquare className=' text-4xl text-blue-700 border-blue-700 p-2 border-thin rounded-full' /></a>
                            <a href=""><FaYoutube className=' text-4xl text-red-500 border-red-500 p-2 border-thin rounded-full' /></a>
                        </div>
                    </div>
                </div>
            </div>
                                       <div className='bg-blue-600 relative w-1/3 lg:w-2/12 h-auto flex items-center justify-center'>
                                <div className='bg-yellow-400 w-20 lg:w-40 h-16 lg:h-36 absolute top-0 left-0 '></div>
                                <figure className='m-1 lg:m-3 relative'>
                                    <img src={assets.imaage} />
                                </figure>
                            </div>
                <h2 className=' text-neutral-700 font-bold text-xl w-2/3 mx-auto'>
                    {data?.name}
                </h2>
                <h2 className='text-blue-700 font-bold text-sm lg:text-lg mx-auto'>
                    {data?.title}
                </h2>
            </div>
            
        </div>
    </div>}
    </>
  )
}

export default POfficers
