import {ACTION_IDS, ActionType} from '../actions'
import { CustomizationType } from '../types'

export const customizations = (state: Array<CustomizationType> = [], action: ActionType) => {
    switch (action.type) {
        case ACTION_IDS['CHARACTERS.ADD_CUSTOMIZATION']:
            const customization: CustomizationType = action.payload
            const id: number = state.findIndex(v => v.id === customization.id)
            if (id >= 0)
                state.splice(id, 1)
            return state.concat(customization)
        case ACTION_IDS['CHARACTERS.SET_CUSTOMIZATIONS']:
            return action.payload
        default:
            return state;
    }
}