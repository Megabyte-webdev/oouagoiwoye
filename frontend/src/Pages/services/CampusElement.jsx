import React from 'react'
import { FaAsterisk, FaFacebookSquare, FaYoutube } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { useNavigate, useParams } from 'react-router-dom';

// mui component 
import {Link} from "react-router-dom";
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs } from '@mui/material';

import assets from '../../assets/assets';
import campusData from "../../Data/campus"
import SliderComponent from '../../Components/SliderComponent';
import { facultyData } from '../../Data/faculty';
import { communityData } from '../../Data/communities';

export default function CampusElement() {
    const {id} = useParams()
    const data = campusData[id]
    const navigate = useNavigate()
    function handleClick(event) {
        event.preventDefault();
        navigate('/services/campus')
    }

    const breadcrumbs = [
        <p key={1} className='text-slate-500' >
            Services
        </p>,
        <a className='text-slate-500 cursor-pointer' key={2} onClick={handleClick} >
            Campus
        </a>,
        <p key={3} className='text-blue-500' >
            {data.campus}
        </p>,
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
                <h2 className='text-blue-700 text-2xl lg:text-4xl font-semibold z-0 absolute'>{data.campus}</h2>
            </div>
            
        </div>
        <div className='mx-4'>
            <img src={data.image} className='w-full mb-2' alt="" />
        </div>
        <div className='mx-4 grid grid-cols-1 lg:grid-cols-2 gap-10'>
            <div className='w-full'>
                <div className='w-full'>
                    <h2 className='text-blue-800 font-bold text-lg lg:text-2xl mt-2'>Brief information about our campus</h2>
                    <p className='mt-2 leading-7 text-sm'>
                        {data.campusInfo}
                    </p>
                </div>
                <div className='w-full'>
                    <h2 className='text-blue-800 font-bold text-lg lg:text-2xl mt-2'>Faculties in the campus</h2>
                    <div className='mt-1  text-sm'>
                        {data.faculties.map((ele, index)=>(
                            <div key={index} className='flex items-center'>
                                <FaAsterisk className='text-blue-900 text-xs' /> <span className='text-sm my-1 ml-2 text-slate-700 font-sans'>{ele}</span>
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
            <div className='w-full h-full p-4 '>
                <iframe {...data.mapData.props} className="w-full lg:w-9/12 aspect-square rounded-xl mx-auto"></iframe>
                <a href={data.mapData.href} className='w-72 lg:w-96 block mx-auto' target='_blank'>
                    <button className='h-14 w-72 lg:w-96 relative my-3 group'>
                        <div className='text-white bg-blue-700 group-hover:bg-gradient-to-r from-blue-700 to-bgBlue h-12 duration-500 p-2 w-72 lg:w-96 absolute top-0 left-0 z-20 flex flex-row items-center justify-center' ><IoLocation className='text-white mr-1' />Get Directions</div>
                        <div className='text-white bg-bgBlue group-hover:bg-yellow-500 duration-500 p-2 w-72 lg:w-96 h-12 absolute  left-3 bottom-0' ></div>
                    </button>
                </a>
            </div>
        </div>
        <div className='mx-3 lg:mx-20 my-2'>
            <h2 className='text-blue-800 font-bold text-lg lg:text-2xl mt-2'>Association/Communities in the campus</h2>
            {/* <CardComponent data={communityData} /> */}
            <SliderComponent data={communityData.items} />
        </div>
        <div className='mx-3 lg:mx-20 my-5'>
            <h2 className='text-blue-800 font-bold text-lg lg:text-2xl mt-2'>Faculties in the campus</h2>
            <SliderComponent data={facultyData.items} />
        </div>
        <div className='mx-3 lg:mx-20 my-5'>
            <h2 className='text-blue-800 font-bold text-lg lg:text-2xl mt-2'>Recent News related to campus</h2>
            <SliderComponent data={facultyData.items} />
        </div>
    </div>
  )
}