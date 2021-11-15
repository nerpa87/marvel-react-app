import {createSelector} from 'reselect'
import {AppStateType} from '../store'

const getCharacters = (state: AppStateType) => state.characters
const getCustomizations = (state: AppStateType) => state.customizations

export interface HeroesType {
    id: number;
    name: string;
    imageUrl: string;
    displayName: string;
    displayImageUrl: string;
};

export const asHeroes = createSelector(
  [ getCharacters, getCustomizations ],
  (characters, customizations) => {
    return characters.map(ch => {
        const custom = customizations.find(v => v.id === ch.id)
        const displayName = (custom && custom.name) ? custom.name : ch.name
        const imageUrl = `${ch.thumbnail.path}.${ch.thumbnail.extension}`
        const displayImageUrl = (custom && custom.imageUrl) ? custom.imageUrl : ''
        return {
            id: ch.id,
            name: ch.name,
            displayName: displayName,
            imageUrl: imageUrl,
            displayImageUrl: displayImageUrl
        }
    })
  }
)