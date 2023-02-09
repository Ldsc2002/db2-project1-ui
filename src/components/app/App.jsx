import React, { useState } from 'react'
import SignIn from '../signIn/SignIn'
import NavBar from '../navBar/NavBar'
import JobsList from '../jobsList/JobsList'
import UserFeed from '../userFeed/UserFeed'
import UserInfo from '../userInfo/UserInfo'
import UserSearch from '../userSearch/UserSearch'
import UserStats from '../userStats/UserStats'
import PageStats from '../pageStats/PageStats'

const pages = ['Feed', 'Jobs', 'Charts', 'Statistics', 'Profile', 'Search']

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
                    {page === 'Charts' && <UserStats />}
                    {page === 'Statistics' && <PageStats />}
                    {page === 'Profile' && <UserInfo user={user} />}
                    {page === 'Search' && <UserSearch />}
                </>
            )}
        </div>
    )
}

export default App
