import React from 'react'
import { FaTriangleExclamation } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'
import "./NoPageFound.css"
import { MetaHelmet } from '../Components/PageAttributes';

const NoPageFound = () => {
  return (
    <>
     <MetaHelmet title="No Page Found" />
    <div className='error-page'>
        <FaTriangleExclamation className='error-icon' />
        <h1>404</h1>
        <h4>No Page Found.</h4>
        <NavLink to='/'><cite>Go back home</cite></NavLink>
    </div>
    </>
  )
}

export default NoPageFound