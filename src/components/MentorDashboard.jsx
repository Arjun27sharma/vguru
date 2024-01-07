import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReviewCard from './ReviewCard';

const MentorDashboard = () => {
    const [tests, setTests] = useState([])
    const API_URL = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000' 
    : 'https://vguru-server.vercel.app';

    useEffect(() => {
        const fetchTests = async () => {
          const response = await axios.get(`${API_URL}/api/test`)
          setTests(response.data)
          setTests(response.data)
        }
        fetchTests()
    }, [])

    const [review, setReview] = useState('')
  return (
    <div className='container mt-5'>

<h1 className='text-center text-md-start mb-3' style={{color: '#007bff', textTransform: 'uppercase', fontWeight: 'bold'}}>Mentor Dashboard</h1>

<p></p>
<div className='container' style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'start', gap: '20px'}}>
        {tests.map((test, index) => {
            
            return (
                <ReviewCard key={index} test={test} index={index}/>
        )})}

</div>

    </div>
  )
}

export default MentorDashboard