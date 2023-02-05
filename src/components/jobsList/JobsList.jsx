import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { getFromCollectionPagination } from '../db/api'
import JobCard from '../jobCard/JobCard'
import classes from './JobsList.module.css'

function App() {
    const [jobs, setJobs] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        getFromCollectionPagination('jobs', page).then((data) => {
            setJobs(jobs.concat(data.documents))
        })
    }, [page])

    return (
        <div className={classes.container}>
            <div>
                {
                    jobs.map((job) => (
                    // eslint-disable-next-line no-underscore-dangle
                        <JobCard key={job._id} job={job} />
                    ))
                }
            </div>

            <Button variant="contained" onClick={() => setPage(page + 1)}>Load More</Button>

        </div>
    )
}

export default App
