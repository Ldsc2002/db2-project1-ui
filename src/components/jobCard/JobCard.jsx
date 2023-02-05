import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

function JobCard(props) {
    const { job } = props

    return (
        <Card sx={{ maxWidth: 600, mb: 3 }}>
            <CardHeader
                subheader={`${`Created on: ${job.date}`}`}
                sx={{ pb: 0 }}
            />
            <CardContent sx={{ pt: 1.5 }}>
                <Typography variant="h4" color="text.secondary">
                    {job.title}
                </Typography>

                <Typography variant="h6" color="text.secondary" sx={{mb: 1}}>
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
                    {`${job.experience.split(" ")[0]} ${parseInt(job.experience.split(" ")[0]) > 1 ? 'years' : 'year'}`}
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
