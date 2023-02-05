import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import { getFromCollectionPagination } from '../db/api'
import PostCard from '../postCard/PostCard'
import classes from './UserFeed.module.css'

function UserFeed(props) {
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)

    const { user } = props

    useEffect(() => {
        getFromCollectionPagination('posts', page).then((data) => {
            setPosts(posts.concat(data.documents))
        })
    }, [page])

    return (
        <div className={classes.container}>
            <div>
                {posts.map((post, index) => (
                    <PostCard
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

            <Button variant="contained" onClick={() => setPage(page + 1)}>Load More</Button>
        </div>
    )
}

export default UserFeed
