import getApi from './octoprint'

export const getState = printer => {
    return getApi(printer).get(`/printer`)
}
