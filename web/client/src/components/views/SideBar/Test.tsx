import React from 'react'
import { buffer } from 'stream/consumers'


interface Props {
    projects_list : any
}

const Test = (props : Props) => {
    const {projects_list}= props
    console.log(projects_list)
    
    return (
     <>
     </>
    );
}

export default Test