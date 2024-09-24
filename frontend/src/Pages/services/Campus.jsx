import React from 'react';
import assets from '../../assets/assets';
import { IoLocationOutline } from "react-icons/io5";
import CustomButton from "../../Components/CustomButton"
import { useNavigate } from 'react-router-dom';

// mui components
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs } from '@mui/material';

import campusData from "../../Data/campus"


export default function Campus() {
    const navigate = useNavigate()
    function handleClick(event) {
        event.preventDefault();
    }

    const breadcrumbs = [
        <p key={1} className='text-slate-500' >
            Services
        </p>,
        <Link key={2} className='text-blue-500' href="/services/campus" onClick={handleClick} >
            Campus
        </Link>
      ];

  return (
    <div className='w-full h-auto lg:h-auto lg:min-h-screen px-2'>
        <div className='p-2 px-4 bg-white'>
            {/* breadcrumbs */}
            <Stack spacing={1}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
            </Stack>
            <div className='w-full flex items-center justify-center relative'>
                <img src={assets.wireframe} className='w-full ' />
                <h2 className='text-blue-700 text-2xl lg:text-4xl font-semibold z-0 absolute'>Campus</h2>
            </div>
            
        </div>
        <div className='p-2 px-4'>
            {campusData.map((item, index)=>(
                <div key={index} className='w-full bg-white even:bg-blue-50 h-auto border-blue-900 border-t-2 last:border-b-2 p-2 flex items-center justify-between'>
                    <div className='bg-blue-600 relative w-1/3 lg:w-2/12 h-auto flex items-center justify-center'>
                        <div className='bg-yellow-400 w-20 lg:w-40 h-16 lg:h-36 absolute top-0 left-0 '></div>
                        <figure className='m-1 lg:m-3 relative'>
                            <img src={assets.ooupics}/>
                        </figure>
                    </div>
                    <div className='w-10/12 h-full p-3 pl-5 lg:pl-10'>
                        <h1 className='text-royal text-xl lg:text-2xl font-bold'>
                            {item.campus}
                        </h1>
                        <p className='flex items-center text-xs lg:text-lg font-semibold mt-2 mb-3 lg:mb-8'>
                            <IoLocationOutline className='mr-2' />
                            {item.location}
                        </p>
                        <CustomButton handleClick={() => navigate(`/services/campus/${item.href}`)} />
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
