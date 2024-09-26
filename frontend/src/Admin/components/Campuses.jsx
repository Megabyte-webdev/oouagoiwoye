import React from 'react'

export default function Campuses() {
  const campus = [
    {
      id: 1,
      campus: "Main Campus"
    },
    {
      id: 2,
      campus: "Egba Campus"
    },
    {
      id: 1,
      campus: "Yewa Campus"
    },
    {
      id: 1,
      campus: "Remo Campus"
    }
  ]
  return (
    <div className='w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-3'>
      {
        campus.map((item, index)=>(
          <div className='rounded-lg shadow-lg p-3'>
              	<span className='font-bold mb-2 text-deep'>{item.campus}</span>
            	
              	{/* <div className='flex flex-col  lg:flex-row items-center justify-between'>
					<span>
						<label htmlFor="image">Campus Image</label>
						<input type="file" id='image' name='image' placeholder='select campus image'/>
					</span>
					<span>
						<label htmlFor="image">Campus video</label>
						<input type="file" id='image' name='image' placeholder='select campus image'/>
					</span>
              	</div> */}
          </div>
        ))
      }
    </div>
  )
}
