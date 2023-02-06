import React from 'react'
import classes from './UserStats.module.css'

function UserStats() {
    return (
        <div className={classes.container}>
            <iframe
                title="Chart 1"
                style={{
                    background: '#FFFFFF', border: 'none', borderRadius: '2px', boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
                }}
                width="640"
                height="480"
                src="https://charts.mongodb.com/charts-project-0-dhpzn/embed/charts?id=63e00e8d-2b02-4f8e-823a-a07daf4d1587&maxDataAge=3600&theme=light&autoRefresh=true"
            />
            <iframe
                title="Chart 2"
                style={{
                    background: '#FFFFFF', border: 'none', borderRadius: '2px', boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
                }}
                width="640"
                height="480"
                src="https://charts.mongodb.com/charts-project-0-dhpzn/embed/charts?id=63e0110d-0679-486d-8409-72f481de1eff&maxDataAge=3600&theme=light&autoRefresh=true"
            />
            <iframe
                title="Chart 3"
                style={{
                    background: '#FFFFFF', border: 'none', borderRadius: '2px', boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
                }}
                width="640"
                height="480"
                src="https://charts.mongodb.com/charts-project-0-dhpzn/embed/charts?id=63e01196-db3b-4411-80c5-f7ce5e42a55b&maxDataAge=3600&theme=light&autoRefresh=true"
            />
            <iframe
                title="Chart 4"
                style={{
                    background: '#FFFFFF', border: 'none', borderRadius: '2px', boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
                }}
                width="640"
                height="480"
                src="https://charts.mongodb.com/charts-project-0-dhpzn/embed/charts?id=63e01217-716e-45ec-8c6f-d386bf7984e9&maxDataAge=3600&theme=light&autoRefresh=true"
            />
            <iframe
                title="Chart 5"
                style={{
                    background: '#FFFFFF', border: 'none', borderRadius: '2px', boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
                }}
                width="640"
                height="480"
                src="https://charts.mongodb.com/charts-project-0-dhpzn/embed/charts?id=63e01327-0679-4f84-8c96-72f481dfd239&maxDataAge=3600&theme=light&autoRefresh=true"
            />
            <iframe
                title="Chart 6"
                style={{
                    background: '#FFFFFF', border: 'none', borderRadius: '2px', boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
                }}
                width="640"
                height="480"
                src="https://charts.mongodb.com/charts-project-0-dhpzn/embed/charts?id=63e01363-2b02-4945-84ba-a07daf509ec4&maxDataAge=3600&theme=light&autoRefresh=true"
            />

            <iframe
                title="Chart 7"
                style={{
                    background: '#FFFFFF',
                    border: 'none',
                    borderRadius: '2px',
                    boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
                }}
                width="640"
                height="480"
                src="https://charts.mongodb.com/charts-project-0-dhpzn/embed/charts?id=63e013de-716e-45a4-8c8c-d386bf7afa90&maxDataAge=3600&theme=light&autoRefresh=true"
            />
            <iframe
                title="Chart 8"
                style={{
                    background: '#FFFFFF',
                    border: 'none',
                    borderRadius: '2px',
                    boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
                }}
                width="640"
                height="480"
                src="https://charts.mongodb.com/charts-project-0-dhpzn/embed/charts?id=63e01472-3254-45cb-833b-d0799ead734a&maxDataAge=3600&theme=light&autoRefresh=true"
            />

        </div>
    )
}

export default UserStats
