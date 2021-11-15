import {ACTION_IDS, ActionType} from '../actions'
import {CharacterType} from '../types'

export const characters = (state: Array<CharacterType> = [], action: ActionType) => {
    switch (action.type) {
        case ACTION_IDS['CHARACTERS.FETCH_COMPLETED']:
            return action.payload;
        default:
            return state;
    }
}