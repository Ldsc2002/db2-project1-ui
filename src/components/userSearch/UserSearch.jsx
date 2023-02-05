import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import UserContact from '../userContact/UserContact'
import classes from './UserSearch.module.css'

import { getFilteredCollection } from '../db/api'

function UserSearch() {
    const [user, setUser] = useState(null)
    const [type, setType] = useState('worker')

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const userSearch = data.get('user')
        const collection = `user_${type}`

        getFilteredCollection(collection, { name: userSearch }).then((res) => {
            if (res.document === null) {
                alert('User not found')
            } else {
                setUser(res.document)
            }
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h3">
                    Search
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="user"
                        label="User"
                        name="user"
                        autoComplete="user"
                        autoFocus
                        sx={{ mt: 3, mb: 2 }}
                    />
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">Account Type</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <FormControlLabel value="worker" control={<Radio />} label="Personal" />
                            <FormControlLabel value="enterprise" control={<Radio />} label="Enterprise" />
                        </RadioGroup>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Search
                    </Button>
                </Box>
            </Box>

            {user && (
                <>
                    <Typography variant="h5" sx={{ mt: 4 }}>
                        Results:
                    </Typography>
                    <Card sx={{ maxWidth: 600, mb: 3, mt: 1 }}>
                        <CardHeader
                            subheader={user.name}
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image={user.photo}
                            alt="Post image"
                        />
                        <CardContent>
                            <Typography variant="subtitle1" color="text.secondary">
                                {user.description}
                            </Typography>

                            {/* Worker-only attributes */}
                            {user.age && (
                                <Typography variant="subtitle1" color="text.secondary">
                                    Age:
                                    {' '}
                                    {user.age}
                                </Typography>
                            )}

                            {user.experience && (
                                <>
                                    <Typography variant="subtitle2" color="text.primary" sx={{ mt: 3 }}>
                                        Experience:
                                    </Typography>

                                    <div className={classes.container}>
                                        {user.experience.map((exp) => (
                                            <Typography variant="body" color="text.secondary" key={exp.id}>
                                                {exp.position}
                                                {' '}
                                                at
                                                {' '}
                                                {exp.company}
                                                {' '}
                                                for
                                                {' '}
                                                {exp.years}
                                                {' '}
                                                years.
                                            </Typography>
                                        ))}
                                    </div>
                                </>
                            )}

                            {user.habilities && (
                                <>
                                    <Typography variant="subtitle2" color="text.primary" sx={{ mt: 3 }}>
                                        Skills:
                                    </Typography>
                                    <Typography variant="body" color="text.secondary">
                                        {user.habilities.map((hab) => hab.name).join(', ')}
                                    </Typography>
                                </>
                            )}

                            {user.education && (
                                <>
                                    <Typography variant="subtitle2" color="text.primary" sx={{ mt: 3 }}>
                                        Education:
                                    </Typography>

                                    <div className={classes.container}>
                                        {user.education.map((edu) => (
                                            <Typography key={edu.id} variant="body" color="text.secondary">
                                                {edu.degree}
                                                {' '}
                                                at
                                                {' '}
                                                {edu.school}
                                            </Typography>
                                        ))}
                                    </div>
                                </>
                            )}

                            <Typography variant="subtitle2" color="text.primary" sx={{ mt: 3 }}>
                                {user.employees ? 'Employees:' : 'Contacts:'}
                            </Typography>

                            <div className={classes.container}>
                                {user.contacts && user.contacts.map((contact) => (
                                    <UserContact key={contact.id} id={contact.user} />
                                ))}
                            </div>

                            <div className={classes.container}>
                                {user.employees && user.employees.map((employee) => (
                                    <UserContact
                                        key={employee.employee_id}
                                        id={employee.employee_id}
                                        position={employee.position}
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </>
            )}
        </Container>

    )
}

export default UserSearch
