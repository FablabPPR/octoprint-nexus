import * as api from '../api/octoprint'
import * as types from '../constants/PrinterActionTypes'

export const getStatus = id => ({
    type: types.GET_STATUS,
    loading: true,
    id,
})
const getStatusSuccess = (id, status) => ({
    type: types.GET_STATUS_SUCCESS,
    loading: false,
    id,
    status,
})
const getStatusError = (id, error) => ({
    type: types.GET_STATUS_ERROR,
    loading: false,
    id,
    error,
})

export const selectPrinter = id => ({
    type: types.SELECT,
    id,
})

const stateRefreshed = (id, state) => ({
    type: types.REFRESH,
    id,
    state,
})

export const refreshState = id => {
    return (dispatch) => {
        return api.getState(id)
            .then(state => dispatch(stateRefreshed(id, state)))
            .catch(error => console.error(error))
    }
}

export const fetchState = id => {
    return (dispatch) => {
        dispatch(getStatus(id))

        return api.getFullStatus(id)
            .then(status => dispatch(getStatusSuccess(id, status)))
            .catch(error => {
                console.error(error)
                dispatch(getStatusError(id, error))
            })
    }
}
