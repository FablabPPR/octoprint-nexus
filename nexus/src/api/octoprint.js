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


export default getApi

export const getVersion = printer => {
    return getApi(printer).get('/version')
}
