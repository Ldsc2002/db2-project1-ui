import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { DeleteForever } from '@mui/icons-material'
import { deleteOneFromCollection } from '../db/api'

function JobCard(props) {
    const { job, user, handle } = props

    const postID = { $oid: job._id }
    const post_user_id = { $oid: job.enterprise_id }
    const current_user_id = { $oid: user._id }

    const handleDeleteJob = () => {
        if (post_user_id.$oid === current_user_id.$oid) {
            deleteOneFromCollection('jobs', { _id: postID })
                .then(() => {
                    handle()
                })
        }
    }

    return (
        <Card sx={{ maxWidth: 600, mb: 3 }}>
            <CardHeader
                sx={{ pb: 0 }}
                action={(
                    <IconButton aria-label="delete">
                        {job.enterprise_id === user._id ? (
                            <DeleteForever onClick={handleDeleteJob} />
                        ) : null}
                    </IconButton>
                )}
                subheader={`${`Created on: ${job.date}`}`}
            />
            <CardContent sx={{ pt: 1.5 }}>
                <Typography variant="h4" color="text.secondary">
                    {job.title}
                </Typography>

                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    {job.description}
                </Typography>

                <Typography variant="subtitle1" color="text.secondary">
                    Salary:
                    {' '}
                    {`${job.salary.currency} ${job.salary.amount}`}
                </Typography>

                <Typography variant="subtitle1" color="text.secondary">
                    Experience:
                    {' '}
                    {`${job.experience.split(' ')[0]} ${parseInt(job.experience.split(' ')[0], 10) > 1 ? 'years' : 'year'}`}
                </Typography>

                <Typography variant="subtitle1" color="text.secondary">
                    Skills:
                    {' '}
                    {job.skills.map((hab) => hab).join(', ')}
                </Typography>

                <Typography variant="subtitle1" color="text.secondary">
                    Location:
                    {' '}
                    {job.location}
                </Typography>

                <Typography variant="subtitle1" color="text.secondary">
                    Category:
                    {' '}
                    {job.category}
                </Typography>

                <Typography variant="subtitle1" color="text.secondary">
                    Spots available:
                    {' '}
                    {job.amount_people}
                </Typography>

            </CardContent>
        </Card>
    )
}

export default JobCard
