import {combineReducers, createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {characters as characterReducer} from './reducers/characters'
import {paging as pagingReducer, PagingType} from './reducers/paging'
import {appStatus as appStatusReducer, AppStatusType} from './reducers/appStatus'
import {customizations as customizationsReducer} from './reducers/customizations'
import {
    CustomizationType,
    CharacterType
} from './types'

import {saga} from './sagas/index'

export interface AppStateType {
    characters: Array<CharacterType>;
    customizations: Array<CustomizationType>;
    paging: PagingType;
    appStatus: AppStatusType;
}

export const reducer = combineReducers<AppStateType>({
    characters: characterReducer,
    customizations: customizationsReducer,
    paging: pagingReducer,
    appStatus: appStatusReducer,
})

export const initStore = () => {
    const sagaMW = createSagaMiddleware()
    const store = createStore(reducer, {}, applyMiddleware(sagaMW))
    sagaMW.run(saga)
    return store
}