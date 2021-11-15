import { CustomizationType } from './types'

const ACTION_IDS_LIST = [
    'CHARACTERS.GET', 
    'CHARACTERS.FETCH', 
    'CHARACTERS.FETCH_COMPLETED',

    'CHARACTERS.ADD_CUSTOMIZATION',
    'CHARACTERS.SET_CUSTOMIZATIONS',

    'PAGING.SET_TOTAL', 
    'PAGING.SET_PAGE', 
    
    'APP_STATUS.SET_LOADING',
    'APP_STATUS.SET_STARTING'
]

type ActionIdsType = {
    [key: string]: string
}
export const ACTION_IDS = ACTION_IDS_LIST.reduce((acc: ActionIdsType, v: string) => {acc[v] = v; return acc}, {})

export interface ActionType {
    type: string;
    payload: any;
}

export const getCharacters = ({page = 1, searchString = ''} = {}) : ActionType => ({
    type: ACTION_IDS['CHARACTERS.GET'],
    payload: {page, searchString}
})

export const setPage = (page: number) : ActionType => ({
    type: ACTION_IDS['PAGING.SET_PAGE'],
    payload: {page}
})

export const addCustomization = (customization: CustomizationType) => ({
    type: ACTION_IDS['CHARACTERS.ADD_CUSTOMIZATION'],
    payload: customization
})