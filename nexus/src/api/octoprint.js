import axios from 'axios'
import config from '../config.json'

const clients = {}

const getApi = printer => {
    if (clients[printer] === undefined) {
        clients[printer] = axios.create({
            baseURL: `/${printer}/api`,
            headers: {
                'X-Api-Key': config.printers[printer].apiKey,
            }
        });
    }

    return clients[printer]
}

export const getVersion = printer => {
    return getApi(printer).get('/version')
}


export const getSettings = printer => {
    return getApi(printer).get('/settings')
}


export const getConnection = printer => {
    return getApi(printer).get('/connection')
}
