import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'

const Student = () => {
  return (
    <div>
      <Navbar />
      <div className='m-1'> 
        <h1 className='font-semibold text-2xl'>Welcome Student!</h1>
        <div className='flex justify-around'>
          <div className='flex flex-col m-2 p-2'>
            <h1>Teacher Profile Details</h1>
            <p>Name: </p>
            <p>Phone No: </p>
            <p>Email: </p>
          </div>


          <ul className='flex flex-col m-2'>
            <h2>Courses you teach:</h2>
            <li>ENG 101</li>
            <li>ENG 101</li>
            <li>ENG 101</li>
          </ul>
        </div>
      </div>

    </div>
  )
}

export default Student