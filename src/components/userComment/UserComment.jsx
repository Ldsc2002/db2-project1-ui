import React from 'react'
import Typography from '@mui/material/Typography'

function UserComment(props) {
    const { comment } = props

    return (
        <div>
            <Typography variant="body" color="text.primary">
                {comment.commentator_id}
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
