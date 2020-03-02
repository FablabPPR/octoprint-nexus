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

const getVersion = printer => {
    return getApi(printer).get('/version')
}

const getSettings = printer => {
    return getApi(printer).get('/settings')
}

const getState = printer => {
    return getApi(printer).get('/printer', {
            validateStatus: status => [200, 409].includes(status)
        }
    )
}

export const getStatus = async printer => {
    let status = {}

    status.version = (await getVersion(printer)).data
    status.settings = (await getSettings(printer)).data
    status.state = (await getState(printer)).data.state

    return status
}
