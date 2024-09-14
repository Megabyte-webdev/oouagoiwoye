import React from 'react'
import statement from "../statement.json"
import side from "../assets/side.svg"
import pin from "../assets/pin.svg"
const Statements = () => {
  return (
    <section className="w-full h-auto p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {statement.map((item, index)=>(
            <div key={item.id} className='flex flex-row items-center w-full bg-blue-50 p-8 relative'>
                <img src={side} className='mr-4' />
                <img src={pin} className='absolute top-4 right-4' />
                <div>
                    <h2 className='text-2xl font-bold text-blue-800'>{item.title}</h2>
                    <p className='text-sm leading-6'>{item.body}</p>   
                </div>
                
            </div>
        ))}
    
</section>
  )
}

export default Statements