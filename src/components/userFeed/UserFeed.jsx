import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { getFromCollectionPaginationAggregation } from '../db/api'
import PostCard from '../postCard/PostCard'
import NewPostForm from '../newPostForm/NewPostForm'
import classes from './UserFeed.module.css'

function UserFeed(props) {
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(0)
    const [openModal, setOpenModal] = useState(false)
    const [sortCriteria, setSortCriteria] = useState('date')

    const { user } = props

    const handleClose = () => {
        setOpenModal(false)
        getFromCollectionPaginationAggregation('posts', [{ $sort: { [sortCriteria]: -1 } }, { $skip: 10 * page }, { $limit: 10 }]).then((data) => {
            setPosts(data.documents)
        })

        setPosts([])
        setPage(0)
    }

    useEffect(() => {
        getFromCollectionPaginationAggregation('posts', [{ $sort: { [sortCriteria]: -1 } }, { $skip: 10 * page }, { $limit: 10 }]).then((data) => {
            setPosts(posts.concat(data.documents))
        })
    }, [page])

    useEffect(() => {
        if (sortCriteria === 'date') {
            getFromCollectionPaginationAggregation('posts', [{ $sort: { date: -1 } }, { $skip: 0 }, { $limit: 10 }]).then((data) => {
                setPosts(data.documents)
            })
        } else {
            getFromCollectionPaginationAggregation('posts', [{ $sort: { likes: -1 } }, { $skip: 0 }, { $limit: 10 }]).then((data) => {
                setPosts(data.documents)
            })
        }

        setPosts([])
        setPage(0)
    }, [sortCriteria])

    return (
        <div className={classes.container}>
            <div style={{ alignItems: 'center' }}>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button variant="contained" onClick={() => setOpenModal(true)}>Create New Post</Button>
                    <Modal open={openModal} onClose={handleClose}>
                        <NewPostForm user={user} onClose={handleClose} />
                    </Modal>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    Sort by:
                    <Button variant="contained" style={{ marginLeft: '10px' }} onClick={() => { setSortCriteria('date') }}>
                        Date
                    </Button>
                    <Button variant="contained" style={{ marginLeft: '10px' }} onClick={() => { setSortCriteria('likes') }}>
                        Likes
                    </Button>
                </div>

            </div>

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
                        handle={handleClose}
                    />
                ))}
            </div>

            <Button variant="contained" onClick={() => setPage(page + 1)}>Load More</Button>

        </div>
    )
}

export default UserFeed
