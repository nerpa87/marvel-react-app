import {call, put, select, takeEvery} from 'redux-saga/effects'
import {AppStateType} from '../store'
import {CharacterType, CustomizationType} from '../types'
import {fetchCharacters, CharacterRespFullType} from '../api/marvel'
import {getCached, putCached} from '../api/storage'
import {ACTION_IDS, ActionType} from '../actions' ///

export function* subscribeGetCharacters() {
    yield takeEvery(ACTION_IDS['CHARACTERS.GET'], getCharacters)
}

export function* subscribeAddCustomization() {
    yield takeEvery(ACTION_IDS['CHARACTERS.ADD_CUSTOMIZATION'], saveCustomization)
}

function* saveCustomization() {
    const state: AppStateType = yield select()
    putCached('customizations', state.customizations)
}

function loadCustomizations() {
    const v = getCached('customizations')
    return(v) ? v : []
}

function* getCharacters(action: ActionType) {
    const state: AppStateType = yield select()
    const perPage = state.paging.perPage
    const page: number = action.payload.page
    const limit: number = perPage
    const offset: number = (page - 1) * perPage
    const searchString = action.payload.searchString
    
    let customizations: Array<CustomizationType> = state.customizations
    if (state.appStatus.starting) {
        customizations = loadCustomizations()
        yield put({type: ACTION_IDS['CHARACTERS.SET_CUSTOMIZATIONS'], payload: customizations})
        yield put({type: ACTION_IDS['APP_STATUS.SET_STARTING'], payload: false})
    }
    
    const extraIds: Array<number> = customizations
        .filter(c => c.name.toLowerCase().startsWith(searchString.toLowerCase()))
        .map(c => c.id);
    yield fetchHeroes(limit, offset, searchString, extraIds)
}


function* fetchHeroes(limit: number, offset: number, searchString: string, extraIds: Array<number>) {
    yield put({type: ACTION_IDS['APP_STATUS.SET_LOADING'], payload: true})
    const charactersResponse: CharacterRespFullType = yield call(fetchCharacters, {limit, offset, searchString})
    const characters: Array<CharacterType> = charactersResponse.data.results

    const extraCharacters: Array<CharacterType> = []
    for (let id of extraIds) {
        let chRes: CharacterRespFullType = yield call(fetchCharacters, {limit, offset, searchString: '', id})
        if (chRes.data.results.length > 0) {
            let ch = chRes.data.results[0]
            if (!characters.find(el => el.id === ch.id)) {
                extraCharacters.push(ch)
            }
        }
    }

    const allCharacters = extraCharacters.concat(characters)
    const total = charactersResponse.data.total + extraCharacters.length

    yield put({type: ACTION_IDS['CHARACTERS.FETCH_COMPLETED'], payload: allCharacters})
    yield put({type: ACTION_IDS['PAGING.SET_TOTAL'], payload: total})
    yield put({type: ACTION_IDS['APP_STATUS.SET_LOADING'], payload: false})
}