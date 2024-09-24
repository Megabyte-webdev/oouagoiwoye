import React, { useState } from 'react'
import SliderComponent from "./SliderComponent"
import "./swipe.css"



export default function CardComponent({data}) {
  const [theme, setTheme] = useState(data.darkTag)
  return (
    <>
    <section className="w-full h-auto lg:h-screen p-10 lg:p-12 bg-blue-100">
            <article>
                <span className={theme === false ? 'bg-slate-300 min-w-20 p-2 justify-items-center' : theme === true ? "bg-amber-950 min-w-20 p-2 justify-items-center" : ''}>
                    <i className={theme === false ? 'bx bx-buildings mr-1 text-xl text-blue-800' : theme ===true ? "bx bx-buildings mr-1 text-xl text-amber-500" : ''}></i>
                    <span className={theme ===false ? "text-xl font-semibold text-blue-800" : theme === true ? "text-xl font-semibold text-amber-500" : ''}>{data.tag}</span>
                </span>
                
                <h2 className="text-xl lg:text-3xl my-3 font-bold">{data.title}</h2>
            </article>
            <SliderComponent data={data.items} />
            
    </section>
    </>
  )
}
