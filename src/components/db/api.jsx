const CORS_PROXY = 'https://justcors.com/l_8rvjduf2bs/'
const DB_URI = `${CORS_PROXY}https://data.mongodb-api.com/app/data-gzxjz/endpoint/data/v1/action/`
const API_KEY = 'DycHKf7QxiRTFXE9rLSSDGcEf8xrKaIboqVbWfK8B7xcPbuLptVTTbtWHK3Bp1ng'
const CLUSTER = 'Cluster0'
const DB = 'project1'
const PAGE_SIZE = 10

export const getFilteredCollection = async (collection, filter, sort) => {
    const data = JSON.stringify({
        database: DB,
        dataSource: CLUSTER,
        collection,
        filter,
        sort,
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

export const getProjection = async (collection, filter, projection) => {
    const data = JSON.stringify({
        database: DB,
        dataSource: CLUSTER,
        collection,
        filter,
        projection,
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

export const getFromCollectionPagination = async (collection, page, sort) => {
    const skip = page * PAGE_SIZE

    const data = JSON.stringify({
        database: DB,
        dataSource: CLUSTER,
        collection,
        sort,
        skip,
        limit: PAGE_SIZE,
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

export const getFromCollectionPaginationAggregation = async (collection, pipeline) => {
    const data = JSON.stringify({
        database: DB,
        dataSource: CLUSTER,
        collection,
        pipeline,
    })

    const response = await fetch(`${DB_URI}aggregate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': API_KEY,
        },
        body: data,
    })

    return response.json()
}

export const updateOneInCollection = async (collection, filter, update) => {
    const data = JSON.stringify({
        database: DB,
        dataSource: CLUSTER,
        collection,
        filter,
        update,
    })

    const response = await fetch(`${DB_URI}updateOne`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': API_KEY,
        },
        body: data,
    })

    return response.json()
}

export const deleteOneFromCollection = async (collection, filter) => {
    const data = JSON.stringify({
        database: DB,
        dataSource: CLUSTER,
        collection,
        filter,
    })

    const response = await fetch(`${DB_URI}deleteOne`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': API_KEY,
        },
        body: data,
    })

    return response.json()
}

export const aggregateInCollection = async (collection, pipeline) => {
    const data = JSON.stringify({
        database: DB,
        dataSource: CLUSTER,
        collection,
        pipeline,
    })

    const response = await fetch(`${DB_URI}aggregate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': API_KEY,
        },
        body: data,
    })

    return response.json()
}

export const insertOneInCollection = async (collection, document) => {
    const data = JSON.stringify({
        database: DB,
        dataSource: CLUSTER,
        collection,
        document,
    })

    const response = await fetch(`${DB_URI}insertOne`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': API_KEY,
        },
        body: data,
    })

    return response.json()
}
