import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { Favorite, DeleteForever } from '@mui/icons-material'
import { Chip } from '@mui/material'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import UserComment from '../userComment/UserComment'
import classes from './PostCard.module.css'
import { updateOneInCollection, deleteOneFromCollection } from '../db/api'

/* eslint-disable react/jsx-props-no-spreading */

const ExpandMore = styled((props) => {
    const { expand, ...other } = props
    return (
        <>
            {' '}
            <Typography variant="body2" color="text.secondary">
                Comments
            </Typography>
            {' '}
            <IconButton {...other} />
        </>
    )
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}))

function PostCard(props) {
    const {
        post, user, index, setPosts, posts, handle,
    } = props

    post.comments.sort((a, b) => new Date(a.date) - new Date(b.date))

    const [newComment, setNewComment] = useState('')
    const [expanded, setExpanded] = useState(false)
    const [likes_, setLikes] = useState(post.likes)

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    useEffect(() => {
        const postID = { $oid: post._id }
        if (likes_ > post.likes) {
            updateOneInCollection('posts', { _id: postID }, { $inc: { likes: 1 } })
        }
    }, [likes_])

    const handleSubmit = () => {
        // eslint-disable-next-line no-underscore-dangle
        const postID = { $oid: post._id }

        const newCommentObj = {
            // eslint-disable-next-line no-underscore-dangle
            commentator_id: user._id,
            comment: newComment,
            date: new Date().toISOString().split('T')[0],
        }

        updateOneInCollection('posts', { _id: postID }, { $push: { comments: newCommentObj } }).then(() => {
            const newPosts = [...posts]
            newPosts[index].comments.push(newCommentObj)
            setPosts(newPosts)
        }).finally(() => {
            setNewComment('')
        })
    }

    const handleDeletePost = () => {
        // eslint-disable-next-line no-underscore-dangle
        const postID = { $oid: post._id }
        const post_user_id = { $oid: post.user_id }
        const current_user_id = { $oid: user._id }

        if (post_user_id.$oid === current_user_id.$oid) {
            deleteOneFromCollection('posts', { _id: postID })
                .then(() => {
                    handle()
                })
        }
    }

    return (
        <Card sx={{ maxWidth: 600, mb: 3 }}>
            <CardHeader
                action={(
                    <IconButton aria-label="delete">
                        {post.user_id === user._id ? (
                            <DeleteForever onClick={handleDeletePost} />
                        ) : null}
                    </IconButton>
                )}
                subheader={post.date}
            />
            <CardMedia
                component="img"
                height="194"
                image={post.image}
                alt="Post image"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {post.description}
                </Typography>
            </CardContent>

            <CardContent style={{ paddingLeft: '15px', paddingTop: '0px' }}>
                <IconButton aria-label="like" sx={{ fontSize: '12px' }}>
                    <Favorite onClick={() => setLikes(likes_ + 1)} />
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '15px' }}>
                        {likes_}
                    </Typography>
                </IconButton>

                <div>
                    {post.tags.map((tag) => (
                        <Chip label={tag} key={tag} />
                    ))}
                </div>
            </CardContent>

            <CardActions disableSpacing sx={{ ml: 1.2 }}>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent sx={{ pt: 0 }}>
                    {post.comments.map((comment) => (
                        <div style={{ marginBottom: '15px' }} key={comment.commentator_id}>
                            <UserComment comment={comment} user={user} post={post} setPosts={setPosts} posts={posts}/>
                        </div>
                    ))}

                    <div className={classes.newComment}>
                        <TextField
                            value={newComment}
                            margin="normal"
                            fullWidth
                            id="comment"
                            label="New comment"
                            sx={{ mr: 2 }}
                            onChange={(e) => setNewComment(e.target.value)}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 2, mb: 1, width: '120px' }}
                            onClick={() => handleSubmit()}
                        >
                            Submit
                        </Button>

                    </div>
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default PostCard
