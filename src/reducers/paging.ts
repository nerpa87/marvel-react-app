import {ActionType, ACTION_IDS} from '../actions'

export interface PagingType {
    perPage: number;
    total: number;
}


const PER_PAGE = 100
export const paging = (state: PagingType = {perPage: PER_PAGE, total: PER_PAGE}, action: ActionType) => {
    switch (action.type) {
        case ACTION_IDS['PAGING.SET_TOTAL']:
            const total: number =  action.payload
            return Object.assign({}, state, {total})
        default:
            return state
    }
}