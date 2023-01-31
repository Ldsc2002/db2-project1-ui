import React from 'react'
import classes from './App.module.css'
import JobsList from '../jobsList/JobsList'

function App() {
    return (
        <div className={classes.container}>
            <JobsList />
        </div>
    )
}

export default App
