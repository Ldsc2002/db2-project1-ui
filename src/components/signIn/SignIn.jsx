import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import { getFilteredCollection, getProjection } from '../db/api'

function SignIn(props) {
    const { setUser } = props

    const [type, setType] = useState('worker')

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const user = data.get('user')
        const collection = `user_${type}`

        getProjection(collection, { name: user }, { _id: 1 }).then((res) => {
            if (res.document === null) {
                alert('User not found')
            } else {
                getFilteredCollection(collection, { name: user }).then((resE) => {
                    setUser(resE.document)
                })
            }
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="user"
                        label="User"
                        name="user"
                        autoComplete="user"
                        autoFocus
                        sx={{ mt: 3, mb: 2 }}
                    />
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">Account Type</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <FormControlLabel value="worker" control={<Radio />} label="Personal" />
                            <FormControlLabel value="enterprise" control={<Radio />} label="Enterprise" />
                        </RadioGroup>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default SignIn
