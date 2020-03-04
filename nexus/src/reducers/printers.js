import update from 'immutability-helper';

import * as types from '../constants/PrinterActionTypes'

const initialState = {
    printers: {},
}

export default (state = initialState, action) => {


    switch (action.type) {
        case types.GET_STATUS:
            return update(state, {
                printers: {
                    [action.id]: {
                        $set: {
                            loading: action.loading,
                        }
                    }
                }
            })
        case types.GET_STATUS_SUCCESS:
            return update(state, {
                printers: {
                    [action.id]: {
                        $set: {
                            loading: action.loading,
                            status: action.status,
                        }
                    }
                }
            })
        case types.GET_STATUS_ERROR:
            return update(state, {
                printers: {
                    [action.id]: {
                        $set: {
                            loading: action.loading,
                            error: action.error,
                        }
                    }
                }
            })
        case types.SELECT:
            return update(state, {
                current: {$set: action.id},
            })
        default:
            return state
    }
}
