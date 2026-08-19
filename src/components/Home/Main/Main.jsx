import React from 'react'
import Top from './Top'
import Recently from './Recently'
import Python from './Language/Python'
import Java from './Language/Java'
import Other from './Language/Other'
import AdminCourses from './AdminCourses'

const Main = () => {
  return (
    <div>
        <div className='my-5'><Top/></div>
        <div className='my-5'><Recently/></div>
        <div className='my-5'><Python/></div>
        <div className='my-5'><Java/></div>
        <div className='mt-5'><Other/></div>
        <div className='mt-5'><AdminCourses/></div>
    </div>
  )
}

export default Main
