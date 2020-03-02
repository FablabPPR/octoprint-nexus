import update from 'immutability-helper';

import * as types from '../constants/PrinterActionTypes'

export default (state = {}, action) => {
    switch (action.type) {
        case types.GET_STATUS:
            return update(state, {
                [action.id]: {$set: {
                    loading: action.loading,
                }}
            })
        case types.GET_STATUS_SUCCESS:
            return update(state, {
                [action.id]: {$set: {
                    loading: action.loading,
                    status: action.status,
                }}
            })
        case types.GET_STATUS_ERROR:
            return update(state, {
                [action.id]: {$set: {
                    loading: action.loading,
                    error: action.error,
                }}
            })
        default:
            return state
    }
}
