import React, { useState, useEffect } from 'react'
import { getFromCollectionPagination } from '../db/api'
import PostCard from '../postCard/PostCard'
import Button from '@mui/material/Button'
import classes from './UserFeed.module.css'

function UserFeed() {
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        getFromCollectionPagination('posts', page).then((data) => {
            setPosts(posts.concat(data.documents))
        })
    }, [page])

    return (
        <div className={classes.container}>
            <div>
                {posts.map((post) => (
                // eslint-disable-next-line no-underscore-dangle
                    <PostCard key={post._id} post={post} />
                ))}
            </div>

            <Button variant="contained" onClick={() => setPage(page + 1)}>Load More</Button>
        </div>
    )
}

export default UserFeed
