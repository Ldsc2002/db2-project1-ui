import React, { useState } from 'react'
import classes from './NewJobForm.module.css'
import { insertOneInCollection } from '../db/api'

function NewJobForm(props) {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [experience, setExperience] = useState('')
    const [salary, setSalary] = useState({ ammount: '', currency: 'Q' })
    const [people, setPeople] = useState('')
    const [skills, setSkills] = useState('')
    const [location, setLocation] = useState('')
    const [category, setCategory] = useState('')

    // eslint-disable-next-line react/destructuring-assignment
    const userID = { $oid: props.user._id }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newJob = {
            enterprise_id: userID,
            title,
            description: text,
            experience,
            // eslint-disable-next-line radix
            salary: { amount: parseInt(salary.ammount), currency: salary.currency },
            amount_people: people,
            skills: skills.split(',') || [],
            location,
            category,
            date: new Date().toISOString().split('T')[0],
        }

        insertOneInCollection('jobs', newJob)
        // eslint-disable-next-line react/destructuring-assignment
        props.onClose()
    }

    return (
        <form onSubmit={handleSubmit} className={classes.formContainer}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <input
                type="text"
                placeholder="Experience (include 'years'/'months')"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
            />

            <select
                value={salary.currency}
                onChange={(e) => setSalary({ ...salary, currency: e.target.value })}
            >
                <option value="Q">Q</option>
                <option value="$">$</option>
            </select>
            <input
                type="text"
                placeholder="Salary"
                value={salary.ammount}
                onChange={(e) => setSalary({ ...salary, ammount: e.target.value })}
            />

            <input
                type="text"
                placeholder="Positions available"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
            />
            <input
                type="text"
                placeholder="Skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
            />
            <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />

            <button type="submit">Post</button>
        </form>
    )
}

export default NewJobForm
