const DB_URI = 'https://justcors.com/tl_8f8a771/https://data.mongodb-api.com/app/data-gzxjz/endpoint/data/v1/action/'
const API_KEY = 'DycHKf7QxiRTFXE9rLSSDGcEf8xrKaIboqVbWfK8B7xcPbuLptVTTbtWHK3Bp1ng'
const CLUSTER = 'Cluster0'
const DB = 'project1'

export const getFilteredCollection = async (collection, filter) => {
    const data = JSON.stringify({
        database: DB,
        dataSource: CLUSTER,
        collection,
        filter,
    })

    const response = await fetch(`${DB_URI}findOne`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': API_KEY,
        },
        body: data,
    })

    return response.json()
}

export const getAllFromCollection = async (collection) => {
    const data = JSON.stringify({
        database: DB,
        dataSource: CLUSTER,
        collection,
    })

    const response = await fetch(`${DB_URI}find`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': API_KEY,
        },
        body: data,
    })

    return response.json()
}
