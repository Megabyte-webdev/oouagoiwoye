import React from 'react'
import { Helmet } from 'react-helmet'


export const MetaHelmet=({title})=>{
    return(
        <Helmet>
            <title>OOU | {title}</title>
        </Helmet>
    )
}