import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import { getFilteredCollection } from '../db/api'

function UserContact(props) {
    const { id, position } = props

    const [name, setName] = useState('')

    useEffect(() => {
        const userID = { $oid: id }

        getFilteredCollection('user_worker', { _id: userID }).then((data) => {
            if (data.document !== null) {
                setName(data.document.name)
            } else {
                getFilteredCollection('user_enterprise', { _id: userID }).then((dataE) => {
                    if (dataE.document !== null) {
                        setName(data.document.name)
                    }
                })
            }
        })
    }, [])

    return (
        <Typography variant="body" color="text.secondary">
            {name}
            {' '}
            {position && `- ${position}`}
        </Typography>

    )
}

export default UserContact
