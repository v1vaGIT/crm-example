import axios from 'axios'

const BASE_URL = '/api/v1'

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})

export {instance}
