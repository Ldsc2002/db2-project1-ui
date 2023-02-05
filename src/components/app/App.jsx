import React, { useState } from 'react'
import SignIn from '../signIn/SignIn'
import NavBar from '../navBar/NavBar'
import JobsList from '../jobsList/JobsList'
import UserFeed from '../userFeed/UserFeed'
import UserInfo from '../userInfo/UserInfo'

const pages = ['Feed', 'Jobs', 'User Info']

function App() {
    const [user, setUser] = useState(null)
    const [page, setPage] = useState('Feed')

    return (
        <div>
            { user === null ? <SignIn setUser={setUser} /> : (
                <>
                    <NavBar setPage={setPage} pages={pages} />
                    {page === 'Feed' && <UserFeed user={user} />}
                    {page === 'Jobs' && <JobsList user={user} />}
                    {page === 'User Info' && <UserInfo user={user} />}
                </>
            )}
        </div>
    )
}

export default App
