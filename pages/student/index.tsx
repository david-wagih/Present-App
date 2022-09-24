import axios from 'axios'
import React, { useState, useEffect } from 'react'
import QRCode from 'react-qr-code'
import Navbar from '../../components/Navbar'

const Student = () => {
  const [student, setStudent] = useState({ name: "", phone: "", email: "", courses: [] })

  useEffect(() => {
    axios.get('http://localhost:3000/api/student')
      .then(res => {
        setStudent(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <Navbar />
      <div className='m-1'>
        <h1 className='font-semibold text-2xl'>Welcome Student!</h1>
        <div className='flex justify-around'>
          <div className='flex flex-col m-2 p-2'>
            <h1>Student Profile Details</h1>
            {student &&
              <>
                <p>Name: {student.name} </p>
                <p>Phone No: {student.phone}</p>
                <p>Email: {student.email}</p>
              </>
            }
          </div>


          <ul className='flex flex-col m-2'>
            <h2>Here are your enrolled courses:</h2>
            <li>ENG 101</li>
            <li>ENG 101</li>
            <li>ENG 101</li>
          </ul>

          <div className='flex flex-col m-2'>
            <h2 className='my-1'>Your Unique QR Code - </h2>
            <QRCode value="https://nawedali.tech" />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Student