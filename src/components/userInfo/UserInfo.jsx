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

            <Typography variant="body" color="text.primary">
                {user.name}
            </Typography>

            <Typography variant="body" color="text.primary">
                {user.description}
            </Typography>

            {/* Worker-only attributes */}
            {user.age && (
                <Typography variant="body" color="text.primary">
                    Age:
                    {' '}
                    {user.age}
                </Typography>
            )}

            {user.experience && (
                <>
                    <Typography variant="body" color="text.primary">
                        Experience:
                    </Typography>
                    {user.experience.map((exp) => (
                        <div key={exp.id}>
                            <Typography variant="body" color="text.primary">
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
                <Typography variant="body" color="text.primary">
                    Skills:
                    {' '}
                    {user.habilities.map((hab) => hab.name).join(', ')}
                </Typography>
            )}

            {user.education && (
                <>
                    <Typography variant="body" color="text.primary">
                        Education:
                    </Typography>

                    {user.education.map((edu) => (
                        <Typography key={edu.id} variant="body" color="text.primary">
                            {edu.degree}
                            {' '}
                            at
                            {' '}
                            {edu.school}
                        </Typography>
                    ))}
                </>
            )}

            <Typography variant="body" color="text.primary">
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
                href='/'
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign Out
            </Button>

        </div>
    )
}

export default UserInfo
