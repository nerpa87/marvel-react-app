import {ActionType, ACTION_IDS} from '../actions'

export interface AppStatusType {
    loading: boolean; // every load
    starting: boolean; // just once
}
export const appStatus = (state: AppStatusType = {loading: false, starting: true}, action: ActionType) => {
    switch (action.type) {
        case ACTION_IDS['APP_STATUS.SET_LOADING']:
            const loading: boolean =  action.payload
            return Object.assign({}, state, {loading})
        case ACTION_IDS['APP_STATUS.SET_STARTING']:
            const starting: boolean =  action.payload
            return Object.assign({}, state, {starting})
        default:
            return state
    }
}