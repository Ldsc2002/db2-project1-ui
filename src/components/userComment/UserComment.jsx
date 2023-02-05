import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { getFilteredCollection } from '../db/api'

function UserComment(props) {
    const { comment } = props

    const [commentator, setCommentator] = useState(comment.commentator_id)

    useEffect(() => {
        const userID = { "$oid": comment.commentator_id }

        getFilteredCollection('user_worker', { _id: userID }).then((data) => {
            if (data.document === null) {
                getFilteredCollection('user_enterprise', { _id: userID }).then((dataE) => {
                    if (dataE.document !== null) {
                        setCommentator(dataE.document.name)
                    }
                })
            } else {
                setCommentator(data.document.name)
            }
        })
    }, [])

    return (
        <div>
            <Typography variant="body" color="text.primary">
                {commentator}
                {' '}
                on
                {' '}
                {comment.date}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {comment.comment}
            </Typography>

        </div>
    )
}

export default UserComment
