import axios from 'axios'
import { get } from 'lodash'

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

    const status = {}

    const version = getVersion(printer).then(response => status.version = response.data)
    const settings = getSettings(printer).then(response => status.settings = response.data)
    const state = getState(printer).then(response => status.state = response.data.state)

    await Promise.all([version, settings, state]).then(values => {
        status.version = values[0]
        status.settings = values[1]
        status.state = values[2]
    });

    let operational = get(status, 'state.flags.operational')
    const retry = 10;
    let retryCount = 0;

    if (!operational) {
        await connect(printer)
    }

    while(!operational) {
        console.warn('Printer ' + printer + ' offline, try to reconnect, attempt ' + retryCount + '/ ' + retry + ' ...')
        status.state = (await getState(printer)).data.state

        operational = get(status, 'state.flags.operational')

        if (operational) {
            break
        }

        if (!operational) {
            retryCount++;
        }

        if (retryCount > retry) {
            break;
        }

        await new Promise(resolve => setTimeout(resolve, 5000))
    }

    return status
}

const connect = async printer => {
    await getApi(printer).post('/connection', {
        command: 'disconnect',
    })
    return getApi(printer).post('/connection', {
        command: 'connect',
    })
}
