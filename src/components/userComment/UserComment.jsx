import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { getFilteredCollection } from '../db/api'

function UserComment(props) {
    const { comment } = props

    const [commentator, setCommentator] = useState(comment.commentator_id)

    useEffect(() => {
        // TODO IDs are not valid in backend

        getFilteredCollection('user_worker', { _id: comment.commentator_id }).then((data) => {
            if (data.document === null) {
                getFilteredCollection('user_enterprise', { _id: comment.commentator_id }).then((dataE) => {
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
