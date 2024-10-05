import React from 'react'
import Main from './campus/Main';
import Egba from './campus/Egba';
import Yewa from './campus/Yewa';
import Sagam from './campus/Sagam';
import All from './campus/All';

export default function Campuses() {
  const campus = [
    {
      id: 1,
      campus: "All",
      view: "all"
    },
    {
      id: 1,
      campus: "Main Campus",
      view: "main"
    },
    {
      id: 2,
      campus: "Egba Campus",
      view: "egba"
    },
    {
      id: 1,
      campus: "Yewa Campus",
      view: "yewa"
    },
    {
      id: 1,
      campus: "Remo Campus",
      view: "remo"
    }
  ]
  const [view, setView] = React.useState("all");
  return (
    <div className='w-full h-full'>
      <div className='w-auto flex items-center justify-center'>{campus.map((item) => <button onClick={() => setView(item.view)} className='mx-2 rounded-md bg-white shadow-lg px-3 py-1'>{item.campus}</button>)}</div>
      <div className='w-full h-auto mt-4'>
        {view === "all" && <All/>}
        {view === "main" && <Main/>}
        {view === "egba" && <Egba/>}
        {view === "yewa" && <Yewa/>}
        {view === "remo" && <Sagam/>}
      </div>
    </div>
  )
}
