import React, { useState } from 'react'
import SignIn from '../signIn/SignIn'
import NavBar from '../navBar/NavBar'
import JobsList from '../jobsList/JobsList'
import UserFeed from '../userFeed/UserFeed'

function App() {
    const [user, setUser] = useState(null)
    const [page, setPage] = useState('Feed')

    return (
        <div>
            { user === null ? <SignIn setUser={setUser} /> : (
                <>
                    <NavBar setPage={setPage} />
                    {page === 'Feed' && <UserFeed user={user} />}
                    {page === 'Jobs' && <JobsList user={user} />}
                </>
            )}
        </div>
    )
}

export default App
