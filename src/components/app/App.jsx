import React, { useEffect } from 'react'
import { getAllFromCollection, getFilteredCollection } from '../db/api'
import classes from './App.module.css'

function App() {
    useEffect(() => {
        getFilteredCollection('posts', { user_id: 'UW359' }).then((data) => {
            console.log(data.document)
        })

        getAllFromCollection('posts').then((data) => {
            console.log(data.documents)
        })
    }, [])

    return (
        <div className={classes.container}>
            Hello
        </div>
    )
}

export default App
