import React, { useState, useEffect } from 'react'
import { getFromCollectionPagination } from '../db/api'
import PostCard from '../postCard/PostCard'
import classes from './UserFeed.module.css'

function UserFeed() {
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        getFromCollectionPagination('posts', page).then((data) => {
            setPosts(data.documents)
        })
    }, [])

    return (
        <div className={classes.container}>
            <div>
                {posts.map((post) => (
                // eslint-disable-next-line no-underscore-dangle
                    <PostCard key={post._id} post={post} />
                ))}
            </div>
        </div>
    )
}

export default UserFeed
