import React from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import classes from './UserInfo.module.css'
import UserContact from '../userContact/UserContact'

function UserInfo(props) {
    const { user } = props

    return (
        <div className={classes.container}>
            <img src={user.photo} alt="Profile" className={classes.image} />

            <Typography variant="h3" color="text.primary" sx={{ mt: 2 }}>
                {user.name}
            </Typography>

            <Typography variant="h5" color="text.secondary">
                {user.description}
            </Typography>

            {/* Worker-only attributes */}
            {user.age && (
                <Typography variant="h5" color="text.secondary">
                    Age:
                    {' '}
                    {user.age}
                </Typography>
            )}

            {user.experience && (
                <>
                    <Typography variant="h6" color="text.primary" sx={{ mt: 3 }}>
                        Experience:
                    </Typography>
                    {user.experience.map((exp) => (
                        <div key={exp.id}>
                            <Typography variant="body" color="text.secondary">
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
                        </div>
                    ))}
                </>
            )}

            {user.habilities && (
                <>
                    <Typography variant="h6" color="text.primary" sx={{ mt: 3 }}>
                        Skills:
                    </Typography>
                    <Typography variant="body" color="text.secondary">
                        {user.habilities.map((hab) => hab.name).join(', ')}
                    </Typography>
                </>
            )}

            {user.education && (
                <>
                    <Typography variant="h6" color="text.primary" sx={{ mt: 3 }}>
                        Education:
                    </Typography>

                    {user.education.map((edu) => (
                        <Typography key={edu.id} variant="body" color="text.secondary">
                            {edu.degree}
                            {' '}
                            at
                            {' '}
                            {edu.school}
                        </Typography>
                    ))}
                </>
            )}

            <Typography variant="h6" color="text.primary" sx={{ mt: 3 }}>
                {user.employees ? 'Employees:' : 'Contacts:'}
            </Typography>

            {user.contacts && user.contacts.map((contact) => (
                <UserContact key={contact.id} id={contact.user} />
            ))}

            {user.employees && user.employees.map((employee) => (
                <UserContact
                    key={employee.employee_id}
                    id={employee.employee_id}
                    position={employee.position}
                />
            ))}

            <Button
                type="submit"
                href="/"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign Out
            </Button>

        </div>
    )
}

export default UserInfo
