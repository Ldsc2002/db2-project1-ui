import React from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import classes from './UserInfo.module.css'
import UserContact from '../userContact/UserContact'
import PostCardUser from '../postCardUser/PostCardUser'
import { getProjection, getFromCollectionPaginationAggregation } from '../db/api'

function UserInfo(props) {
    const { user } = props
    const id = { $oid: user._id }

    const [name_, setName] = React.useState('')
    const [description_, setDescription] = React.useState('')

    const [posts, setPosts] = React.useState([])

    const handleBulk = () => {

    }

    React.useEffect(() => {
        getProjection('user_worker', { _id: id }, { name: 1, description: 1, _id: 0 }).then((data) => {
            if (data.document !== null) {
                setName(data.document.name)
                setDescription(data.document.description)
            } else {
                getProjection('user_enterprise', { _id: id }, { name: 1, description: 1, _id: 0 }).then((dataE) => {
                    if (dataE.document !== null) {
                        setName(dataE.document.name)
                        setDescription(dataE.document.description)
                    }
                })
            }
        })
    }, [])

    React.useEffect(() => {
        getFromCollectionPaginationAggregation('posts', [{ $match: { user_id: id } }, {
            $project: {
                _id: 0, date: 1, description: 1, image: 1,
            },
        }, { $sort: { date: -1 } }, { $limit: 3 }]).then((data) => {
            setPosts(data.documents)
        })
    }, [])

    return (
        <div className={classes.container}>
            <img src={user.photo} alt="Profile" className={classes.image} onClick={handleBulk} />

            <Typography variant="h3" color="text.primary" sx={{ mt: 2 }}>
                {name_}
            </Typography>

            <Typography variant="h5" color="text.secondary">
                {description_}
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

            {posts && (
                <>
                    <Typography variant="h6" color="text.primary" sx={{ mt: 3 }}>
                        Posts:
                    </Typography>
                    <div>
                        {posts.map((post, index) => (
                            <PostCardUser
                                // eslint-disable-next-line no-underscore-dangle
                                key={post._id}
                                post={post}
                                user={user}
                                setPosts={setPosts}
                                index={index}
                                posts={posts}
                            />
                        ))}
                    </div>
                </>
            )}

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
