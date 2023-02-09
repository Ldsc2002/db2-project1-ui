import React, { useState, useEffect, useRef } from 'react'
import Typography from '@mui/material/Typography'
import { DeleteForever } from '@mui/icons-material'
import { getFilteredCollection } from '../db/api'
import classes from './UserComment.module.css'
import { updateOneInCollection } from '../db/api'

function UserComment(props) {
    const { comment, user, post, setPosts, posts } = props

    const commentatorID = useRef(comment.commentator_id)
    const [commentator, setCommentator] = useState(comment.commentator_id)

    useEffect(() => {
        const userID = { $oid: comment.commentator_id }

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

    const handleDelete = () => {
        const postID = { $oid: post._id }

        const commentIndex = post.comments.indexOf(comment)

        updateOneInCollection('posts', { _id: postID }, { $pop: { comments: 1 } }).then(() => {
            let newPosts = [...posts]
            newPosts[posts.indexOf(post)].comments.splice(commentIndex, 1)
            setPosts(newPosts)
        })
    }

    return (
        <div className={classes.container}>
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
            {commentatorID.current === user._id && (
                <DeleteForever onClick={handleDelete}/>
            )}
        </div>
    )
}

export default UserComment
