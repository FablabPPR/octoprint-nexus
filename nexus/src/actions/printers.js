import * as api from '../api/octoprint'
import * as types from '../constants/PrinterActionTypes'

export const getStatus = id => ({
    type: types.GET_STATUS,
    loading: true,
    id,
})
export const getStatusSuccess = (id, status) => ({
    type: types.GET_STATUS_SUCCESS,
    loading: false,
    id,
    status,
})
export const getStatusError = (id, error) => ({
    type: types.GET_STATUS_ERROR,
    loading: false,
    id,
    error,
})

export const fetchState = id => {
    return (dispatch) => {
        dispatch(getStatus(id))

        return api.getStatus(id)
            .then(status => dispatch(getStatusSuccess(id, status)))
            .catch(error => {
                console.error(error)
                dispatch(getStatusError(id, error))
            })
    }
}
