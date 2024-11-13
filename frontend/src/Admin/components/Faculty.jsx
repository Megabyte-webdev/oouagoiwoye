import React from 'react'
import FormInput from "../../Components/FormInput"
import CustomButton2 from '../../Components/CustomButton2';

export default function Faculty() {
	const [facultyData, setFacultyData] = React.useState({});
	const [facultyImage, setFacultyImage] = React.useState({});
	const [deanImage, setDeanImage] = React.useState({});
	const [facultyContact, setFacultyContact] = React.useState({})
	const [lecturer, setLecturer] = React.useState({})
	const [department, setDepartment] = React.useState({})

	React.useEffect(()=>{
		console.log(facultyImage);
		console.log(deanImage);
		console.log(lecturer);
		console.log(department);
		
	}, [facultyData, facultyImage, deanImage, facultyContact, lecturer, department])
  return (
    <div className='w-full h-full grid grid-cols-2 gap-7 font-sans'>
      <div className='flex flex-col rounded-md p-5 shadow-xl border-thin'>
            <p className='font-semibold text-xl mb-3 text-center'>Faculty datas</p>
            
        </div>
		<div className='flex flex-col items-center ring-1 rounded-md p-5 shadow-xl overflow-y-scroll'>
			<div className='w-full p-3 shadow-xl'>
            	<p className='font-semibold text-xl mb-3 text-center'>Update Faculty data</p>
				<form action="">
					<FormInput title="Faculty Name" type='text' name='title' placeholder='Enter new faculty name' key={1} onchange={(e)=>{setFacultyData({...facultyData, [e.target.name]: e.target.value})}} />
					<FormInput title="Dean Name" type='text' name='deanName' placeholder='Enter dean name here' key={2} onchange={(e)=>{setFacultyData({...facultyData, [e.target.name]: e.target.value})}} />
					<FormInput title="No. of Dept." type='number' name='noOfDepartments' placeholder='Enter no of departments here' key={3} onchange={(e)=>{setFacultyData({...facultyData, [e.target.name]: e.target.value})}} />
					<FormInput title="About Faculty" type='text' name='body' placeholder='Enter faculty info here' key={4} onchange={(e)=>{setFacultyData({...facultyData, [e.target.name]: e.target.value})}} />
					<CustomButton2 title={"Update"}/>
				</form>
			</div>
			<div className='w-full p-3 shadow-xl mt-5'>
            	<p className='font-semibold text-xl mb-3 text-center'>Update Faculty image</p>
				<form action="" encType='multipart/form-data'>
					<FormInput title="Faculty Image" type='file' name='image' placeholder='select new faculty image' key={1} onchange={(e)=>{setFacultyImage({...facultyImage, [e.target.name]: e.target.files[0]})}} />
					<CustomButton2 title={"Update"}/>
				</form>
			</div>
			<div className='w-full p-3 shadow-xl mt-5'>
            	<p className='font-semibold text-xl mb-3 text-center'>Update Dean image</p>
				<form action="" encType='multipart/form-data'>
					<FormInput title="Dean Image" type='file' name='deanImage' placeholder='select new dean image' key={1} onchange={(e)=>{setDeanImage({...deanImage, [e.target.name]: e.target.files[0]})}} />
					<CustomButton2 title={"Update"}/>
				</form>
			</div>
			<div className='w-full p-3 shadow-xl mt-5'>
            	<p className='font-semibold text-xl mb-3 text-center'>Update Faculty Contact</p>
				<form action="">
					<FormInput title="Whasapp" type='text' name='whatsapp' placeholder='whasapp No.' key={1} onchange={(e)=>{setFacultyContact({...facultyContact, [e.target.name]: e.target.value})}} />
					<FormInput title="Facebook" type='text' name='facebook' placeholder='Facebook profile' key={2} onchange={(e)=>{setFacultyContact({...facultyContact, [e.target.name]: e.target.value})}} />
					<FormInput title="youtube" type='text' name='youtube' placeholder='Youtube channel' key={3} onchange={(e)=>{setFacultyContact({...facultyContact, [e.target.name]: e.target.value})}} />
					<CustomButton2 title={"Update"}/>
				</form>
			</div>
			<div className='w-full p-3 shadow-xl mt-5'>
				<p className='font-semibold text-xl mb-3 text-center'>Create lecturers</p>
				<form action="" encType='multipart/form-data'>
					<FormInput title="Name" type='text' name='name' placeholder='Enter lecturer name here' key={1} onchange={(e)=>{setLecturer({...lecturer, [e.target.name]: e.target.value})}} />
					<FormInput title="Designation" type='text' name='designation' placeholder='Enter lecturer designation here' key={2} onchange={(e)=>{setLecturer({...lecturer, [e.target.name]: e.target.value})}} />
					<FormInput title="Image" type='file' name='image' placeholder='' key={3} onchange={(e)=>{setLecturer({...lecturer, [e.target.name]: e.target.files[0]})}} />
					<CustomButton2 title={"Update"}/>
				</form>
			</div>
			<div className='w-full p-3 shadow-xl mt-5'>
				<p className='font-semibold text-xl mb-3 text-center'>Create Department</p>
				<form action="" encType='multipart/form-data'>
					<FormInput title="Title" type='text' name='title' placeholder='Enter department title here' key={1} onchange={(e)=>{setDepartment({...department, [e.target.name]: e.target.value})}} />
					<FormInput title="Image" type='file' name='image' placeholder='' key={3} onchange={(e)=>{setDepartment({...department, [e.target.name]: e.target.files[0]})}} />
					<FormInput title="Body" type='text' name='designation' placeholder='Enter department info here' key={2} onchange={(e)=>{setDepartment({...department, [e.target.name]: e.target.value})}} />
					<CustomButton2 title={"Update"}/>
				</form>
			</div>
		</div>

    </div>
  )
}
