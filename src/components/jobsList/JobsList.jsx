import React, { useEffect, useState } from 'react'
import { getAllFromCollection } from '../db/api'

function App() {
    const [jobs, setJobs] = useState([])

    useEffect(() => {
        getAllFromCollection('jobs').then((data) => {
            setJobs(data.documents)
        })
    }, [])

    return (
        <div>
            {jobs.map((job, index) => (
                <div key={index}>
                    <h1>{job.title}</h1>
                </div>
            ))}
        </div>
    )
}

export default App
