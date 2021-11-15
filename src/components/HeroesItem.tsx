import React from 'react'
import {connect} from 'react-redux'
import {useParams, Navigate, useNavigate} from 'react-router-dom'
import {NavigateFunction} from 'react-router'
import {AppStateType} from '../store'
import {HeroesType, asHeroes} from '../selectors/heroes'
import {addCustomization} from '../actions'

interface Props {
    hero: HeroesType;
    navigate: NavigateFunction;
    addCustomization: (id: number, name: string, imageUrl: string) => void;
}
class HeroesItem extends React.Component<Props> {

    state = {
        displayName: '',
        displayImageUrl: ''
    }

    componentDidMount() {
        const {hero} = this.props;
        this.setState({
            displayName: hero.displayName,
            displayImageUrl: hero.displayImageUrl
        })
    }

    onNameChange(v: string) {
        this.setState({displayName: v})
    }

    onImageUrlChange(v: string) {
        this.setState({displayImageUrl: v})
    }

    onClick() {
        const {hero, navigate} = this.props
        const {displayName, displayImageUrl} = this.state
        this.props.addCustomization(hero.id, displayName, displayImageUrl)
        navigate(-1);
    }

    render() {
        const {hero} = this.props
        const {displayName, displayImageUrl} = this.state
        return (
            <div className="hero">
                <div className="hero-image">
                    <img alt={hero.displayName} src={(hero.displayImageUrl !== '') ? hero.displayImageUrl : hero.imageUrl} width="400px" />
                    <input type="text" placeholder="New Image url" value={displayImageUrl} onChange={(e) => {this.onImageUrlChange(e.target.value)}}/>
                </div>
                <div className="hero-summary">
                    <div className="hero-summary-row">
                        Name: <input type="text" value={displayName} onChange={(e) => {this.onNameChange(e.target.value)}}/>
                    </div>
                    <div className="hero-summary-row-bottom">
                        <button onClick={() => this.onClick()}>Save customization</button>
                    </div>
                </div>                
            </div>
        )
    }
}

interface WrapProps {
    heroes: Array<HeroesType>;
    addCustomization: (id: number, name: string, imageUrl: string) => void;
}
const HeroesItemWrap: React.FC<WrapProps> = ({heroes, addCustomization}: WrapProps) => {
    const {id: sId} = useParams()
    const id = (sId) ? parseInt(sId) : 0
    const hero = heroes.find(el => el.id === id)
    const navigate = useNavigate()
    if (!hero)
        return <Navigate to='/'/>
    return <HeroesItem hero={hero} addCustomization={addCustomization} navigate={navigate} />
}

export default connect(
    (state: AppStateType) => ({
        heroes: asHeroes(state)
    }),
    (dispatch: (fn: any) => void) => ({
        addCustomization: (id: number, name: string, imageUrl: string) => dispatch(addCustomization({id, name, imageUrl}))
    })
  )(HeroesItemWrap);