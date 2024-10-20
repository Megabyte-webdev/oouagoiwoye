import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {departmentData} from '../../Data/departments'

import {facultyData} from '../../Data/faculty'
import {lecturerData} from '../../Data/lecturers'


// mui component 
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs } from '@mui/material';

import SliderComponent from '../../Components/SliderComponent';

import assets from '../../assets/assets';
import { communityData } from '../../Data/communities';
import { data } from '../../Data/news';

export default function Faculty() {
    const { facultyId } = useParams();
    const [faculty, setFaculty]=useState([])
  
    useEffect(() => {
        if(facultyId){
            setFaculty(facultyData.items.filter(fac=> fac.href === facultyId)[0])
        }
    }, [facultyId,faculty])
    
    
    const breadcrumbs = [
        <p key={1} href='/' className='text-slate-500' >
            Home
        </p>,
        <Link to='/faculties' className='text-slate-500 cursor-pointer' key={2} >
            Faculties
        </Link>,
        <p key={3} className='text-blue-500' >
            {facultyId}
        </p>,
      ];
 
  return (
    <div className='w-full h-auto md:min-h-screen px-2'>
       <div className='p-2 px-4 bg-white'>
            {/* breadcrumbs */}
            <Stack spacing={1}>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
            </Stack>
            <div className='w-full flex items-center justify-center relative'>
                <img src={assets.wireframe} className='w-full ' />
                <h2 className='text-blue-700 text-2xl lg:text-4xl font-semibold z-0 absolute'>{faculty.title}</h2>
            </div>
            
        </div>
        <div className='mx-4 h-[400px]'>
            <img src={faculty.image} className='w-full h-full mb-2 object-cover object-top' alt="" />
        </div>

        {/* Faculty intro */}
        <div className='flex flex-col gap-4 md:flex-row justify-between w-full px-4 my-6'>
            {/* Left side */}
            <div className='flex-1 w-full md:w-1/2'>
                <h4 className='text-2xl md:text-3xl text-royal font-medium w-2/3 md:w-1/2 py-5'>Welcome to {faculty.title}</h4>
                <p className='text-sm md:text-xl text-gray-600'>{faculty.body}</p>
                <div className='my-5'>
            <h2 className='capitalize text-blue-900 font-bold text-xl lg:text-2xl my-3'>Contact information</h2>
            <section className="w-max grid grid-cols-3 gap-10">
            <a href=""><i className='bx bxl-whatsapp text-green-700 text-2xl border-2 border-green-700 p-2 py-1 rounded-full'></i></a>
            <a href=""><i className='bx bxl-facebook-square text-blue-700 text-2xl border-2 border-blue-700 p-2 py-1 rounded-full'></i></a>
            <a href=""><i className='bx bxl-youtube text-red-700 text-2xl border-2 border-red-700 p-2 py-1 rounded-full'></i></a>
        </section>
            </div>
            </div>
            {/* Right side */}
            <div className='flex flex-col items-center md:items-end w-full md:w-[40%]'>
                <img className='w-[80%]' src={assets.vc} alt="" />
                <p className='capitalize w-[80%] text-2xl font-semibold py-2'>{faculty.dean}</p>
                <p className='w-[80%] text-xl text-blue-900 font-semibold py-2'>Faculty Dean</p>
            </div>
        </div>

        <div className='mx-3 my-3'>
            <h2 className='capitalize text-blue-900 font-bold text-xl md:text-2xl lg:text-3xl my-8'>All Departments</h2>
            
            <SliderComponent design="department" data={departmentData} />
        </div>

        <div className='mx-3 my-3'>
            <h2 className='capitalize text-blue-900 font-bold text-xl md:text-2xl lg:text-3xl my-8'>Faculty lecturers</h2>
            
            <SliderComponent design="lecturer" data={lecturerData.items} />
        </div>

        <div className='mx-3 my-3'>
            <h2 className='capitalize text-blue-900 font-bold text-xl md:text-2xl lg:text-3xl my-8'>Associations/Communities in the faculty</h2>
            
            <SliderComponent hideBtn={true} data={communityData.items} />
        </div>

        <div className='mx-3 my-3'>
            <h2 className='capitalize text-blue-900 font-bold text-xl md:text-2xl lg:text-3xl my-8'>Recent News related to the faculty</h2>
            
            <SliderComponent design="news" btnDesc="Read More" data={data.items} />
        </div>


    </div>
  )
}