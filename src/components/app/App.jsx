import React, { useState } from 'react'
import SignIn from '../signIn/SignIn'
import NavBar from '../navBar/NavBar'
import JobsList from '../jobsList/JobsList'

function App() {
    const [user, setUser] = useState(null)

    return (
        <div>
            { user === null ? <SignIn setUser={setUser} /> : (<>
                <NavBar />
                <JobsList />
            </>)}
        </div>
    )
}

export default App
