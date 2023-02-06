import React, { useState } from 'react'
import classes from './NewPostForm.module.css'
import { insertOneInCollection } from '../db/api'

function NewPostForm(props) {
    const [text, setText] = useState('')
    // eslint-disable-next-line react/destructuring-assignment
    const [photo, setPhoto] = useState(props.photo || 'https://placeimg.com/640/480/animals')
    const [tags, setTags] = useState([])

    // eslint-disable-next-line react/destructuring-assignment
    const userID = { $oid: props.user._id }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newPost = {
            description: text,
            date: new Date().toISOString().split('T')[0],
            image: photo,
            user_id: userID,
            comments: [],
            likes: 0,
            tags: tags.split(','),
        }

        insertOneInCollection('posts', newPost)
        // eslint-disable-next-line react/destructuring-assignment
        props.onClose()
    }

    return (
        <form onSubmit={handleSubmit} className={classes.formContainer}>
            <input
                type="text"
                placeholder="Add a photo URL"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
            />
            <textarea
                placeholder="Write your post here"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <input
                type="text"
                placeholder="Add tags separated by commas (no spaces)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />
            <button type="submit">Post</button>
        </form>
    )
}

export default NewPostForm
