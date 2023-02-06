import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { getFromCollectionPagination, getProjection } from '../db/api'
import JobCard from '../jobCard/JobCard'
import classes from './JobsList.module.css'
import NewJobForm from '../newJobForm/NewJobForm'

function App(props) {
    const [jobs, setJobs] = useState([])
    const [page, setPage] = useState(0)
    const [openModal, setOpenModal] = useState(false)
    const [enterprise, setEnterprise] = useState(null)

    const { user } = props

    // eslint-disable-next-line no-underscore-dangle
    getProjection('user_enterprise', { _id: { $oid: user._id } }, { name: 1 }).then((data) => {
        if (data.document === null) {
            setEnterprise(null)
        } else {
            setEnterprise(data.document.name)
        }
    })

    const handleClose = () => {
        setOpenModal(false)
        getFromCollectionPagination('jobs', 0, { date: -1 }).then((data) => {
            setJobs(data.documents)
        })
        setJobs([])
        setPage(0)
    }

    useEffect(() => {
        getFromCollectionPagination('jobs', page, { date: -1 }).then((data) => {
            setJobs(jobs.concat(data.documents))
        })
    }, [page])

    return (
        <div className={classes.container}>

            {enterprise && (
                <>
                    <Button variant="contained" onClick={() => setOpenModal(true)}>Create New Post</Button>
                    <Modal open={openModal} onClose={handleClose}>
                        <NewJobForm user={user} onClose={handleClose} />
                    </Modal>
                </>
            )}

            <div>
                {
                    jobs.map((job) => (
                    // eslint-disable-next-line no-underscore-dangle
                        <JobCard key={job._id} job={job} user={user} handle={handleClose} />
                    ))
                }
            </div>

            <Button variant="contained" onClick={() => setPage(page + 1)}>Load More</Button>

        </div>
    )
}

export default App
