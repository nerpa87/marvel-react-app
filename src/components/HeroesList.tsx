import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link, useParams, useNavigate, useSearchParams} from 'react-router-dom'
import Pagination from 'react-router-pagination'
import {createSearchParams} from "react-router-dom";
import {AppStateType} from '../store'
import {HeroesType, asHeroes} from '../selectors/heroes'
import {getCharacters as getHeroesAction} from '../actions'
import Search from './Search'

interface Props {
    heroes: Array<HeroesType>;
    totalPages: number;
    loading: boolean;
    getCharacters: (page: number, searchString: string) => void;
}

const HeroesList: React.FC<Props> = ({heroes, getCharacters, totalPages, loading}: Props) => {
  const {page: sPage} = useParams()
  const search: URLSearchParams = useSearchParams()[0]
  const searchStringArg = search.get('name')
  const searchString: string = (searchStringArg) ? searchStringArg : ''
  const pageFromRoute = (sPage) ? parseInt(sPage) : 1
  useEffect(() => getCharacters(pageFromRoute, searchString),[pageFromRoute, searchString])
  const navigate = useNavigate()
  if (loading)
    return <div>Loading...</div>
  const match = {
    pathname: '/:page',
    params: {
      page: 1
    },
    // actually to use search with pagination we have to fix the module
    // need to add 'search' argument here - https://github.com/sequencemedia/react-router-pagination/blob/master/src/pagination/component.tsx#L28
    search: `?${createSearchParams({
        name: searchString
    })}`
  }
  return (
    <div>
      <Search navigate={navigate} searchString={searchString}/>
      <div className="heroes-list">
            {heroes.map(h => <div key={h.id}><Link to={`/item/${h.id}`}>{h.displayName}</Link></div>)}
      </div>
      <Pagination match={match} totalPages={totalPages} pageNumber={pageFromRoute} />
    </div>
  );
}

export default connect(
  (state: AppStateType) => ({
      heroes: asHeroes(state),
      paging: state.paging,
      totalPages: Math.ceil(state.paging.total/state.paging.perPage),
      loading: state.appStatus.loading
  }),
  (dispatch: (fn: any) => void) => ({
      getCharacters: (page: number, searchString: string) => dispatch(getHeroesAction({page, searchString}))
  })
)(HeroesList);
