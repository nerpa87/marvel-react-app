import {CharacterType} from '../types'
import Marvel from 'marvel'
import {getCached, putCached} from '../api/storage'
require('dotenv').config()

const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY
const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY

const marvel = new Marvel({ publicKey, privateKey})

export interface CharacterRespFullType {
    data: {
        total: number;
        results: Array<CharacterType>
    }
}

export const fetchCharacters = ({limit = 10, offset = 0, searchString = '', id = 0} = {}) => {
    return new Promise((resolve, reject) => {
        const cacheKey = `marvel_characters_query_${offset}_${limit}_${searchString}_${id}`
        const cachedValue = getCached(cacheKey)
        if (cachedValue)
            return resolve(cachedValue as CharacterRespFullType)

        var query = marvel.characters.limit(offset, limit);
        if (searchString !== '')
            query = query.nameStartsWith(searchString)
        if (id !== 0)
            query = query.id(id)
        query.get((err: any, resp: Array<CharacterType>, respFull: CharacterRespFullType) => {
            if (err)
                return reject(err)
            putCached(cacheKey, respFull)
            return resolve(respFull)
        })
    })
}