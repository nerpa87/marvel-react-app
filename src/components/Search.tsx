import React from 'react'
import {createSearchParams} from "react-router-dom"
import {NavigateFunction} from 'react-router'
import {connect} from 'react-redux'
import {AppStateType} from '../store'
import {getCharacters as getHeroesAction} from '../actions'

interface Props {
    navigate: NavigateFunction;
    getCharacters: (page: number, searchString: string) => void;
    searchString: string
}

class Search extends React.Component<Props> {
    state = {
        searchString: ''
    }

    componentDidMount() {
        this.setState({searchString: this.props.searchString})
    }

    onChange(v: string) {
        this.setState({searchString: v})
    }

    onClick() {
        const {searchString} = this.state;
        this.props.getCharacters(1, this.state.searchString.trim())
        this.props.navigate({
            pathname: '/',
            search: `?${createSearchParams({
                name: searchString
            })}`
        })
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.searchString} onChange={(e) => {this.onChange(e.target.value)}} />
                <button onClick={() => this.onClick()}>Search</button>
            </div>
        )
    }

}

export default connect(
    (state: AppStateType) => ({}),
    (dispatch: (fn: any) => void) => ({
        getCharacters: (page: number, searchString: string) => dispatch(getHeroesAction({page, searchString}))
    })
  )(Search);