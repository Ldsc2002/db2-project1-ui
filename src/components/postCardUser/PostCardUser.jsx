import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { Favorite } from '@mui/icons-material'
import { Chip } from '@mui/material'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import UserComment from '../userComment/UserComment'
import classes from './PostCardUser.module.css'

function PostCardUser(props) {
    const {
        post
    } = props

    return (
        <Card sx={{ maxWidth: 600, mb: 3 }}>
            <CardHeader
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
        </Card>
    )
}

export default PostCardUser
