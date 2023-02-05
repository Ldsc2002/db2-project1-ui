import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { getFromCollectionPagination } from '../db/api'
import PostCard from '../postCard/PostCard'
import NewPostForm from '../newPostForm/NewPostForm'
import classes from './UserFeed.module.css'

function UserFeed(props) {
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(0)
    const [openModal, setOpenModal] = useState(false)

    const { user } = props
    
    const handleClose = () => {
        setOpenModal(false)
        getFromCollectionPagination('posts', 0, { date: -1 }).then((data) => {
            setPosts(data.documents)
        })
        setPosts([])
        setPage(0)
    };

    useEffect(() => {
        getFromCollectionPagination('posts', page, { date: -1 }).then((data) => {
            setPosts(posts.concat(data.documents))
        })
    }, [page])

    return (
        <div className={classes.container}>

            <Button variant="contained" onClick={() => setOpenModal(true)}>Create New Post</Button>
            
            <Modal open={openModal} onClose={handleClose}>
                <NewPostForm user={user} onClose={handleClose} />
            </Modal>

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
                        handle = {handleClose}
                    />
                ))}
            </div>

            <Button variant="contained" onClick={() => setPage(page + 1)}>Load More</Button>

        </div>
    )
}

export default UserFeed
