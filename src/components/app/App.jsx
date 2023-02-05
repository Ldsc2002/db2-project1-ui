import React, { useState } from 'react'
import SignIn from '../signIn/SignIn'
import NavBar from '../navBar/NavBar'
// import JobsList from '../jobsList/JobsList'
import UserFeed from '../userFeed/UserFeed'

function App() {
    const [user, setUser] = useState(null)

    return (
        <div>
            { user === null ? <SignIn setUser={setUser} /> : (
                <>
                    <NavBar />
                    <UserFeed />
                </>
            )}
        </div>
    )
}

export default App
