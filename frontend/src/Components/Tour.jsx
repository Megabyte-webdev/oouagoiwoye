import React, { useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import Video from './Video';
import tour from "../assets/tour.svg"
import bg from "../assets/bg.png"
const Tour = () => {
  const [play, setPlay]= useState(false);
  return (
         <section className={`relative w-full h-screen flex flex-col items-center justify-center ${play?' active':''}`} style={{backgroundImage: `url(${bg})`, backgroundPosition: 'top center', backgroundSize: 'cover'}}>
          <img src={tour} className='w-4/5'/>
          {/* <Video playState={play} className="video" /> */}
          <button className="primary-btn" onClick={()=>setPlay(!play)}><a>
              {
                play? <FaPause className='icon' style={{margin: "0", marginRight: "5px"}} />:<FaPlay className='icon' style={{margin: "0", marginRight: "5px"}} />
              } Take a Tour</a> 
          </button>
        </section>
  )
}

export default Tour