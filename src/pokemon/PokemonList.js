import React, { Component } from 'react'
import axios from 'axios'
import PokemonCard from './PokemonCard'
import app from '../base'

export default class PokemonList extends Component {
  constructor() {
    super()
    this.state = {
      url: "https://pokeapi.co/api/v2/pokemon/?limit=964",
      pokemon: [],
      items: 64,
      pokeArray: [],
      pokeElements : [], 
      dataLoaded: false
    }
  }
  
  async componentDidMount() {
    const res = await axios.get(this.state.url)
    //let pokeElements = this.firstShowItems(res.data['results'], 964)
    let pokeArray = this.firstShowItems(res.data['results'], 64)
    window.addEventListener('scroll', () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.showItems(this.state.pokemon, 20)
      } 
    })
    this.setState({
      pokemon: res.data['results'], 
      //pokeElements: pokeElements,
      pokeArray: pokeArray,
      dataLoaded: true 
    })
  } 

  filterPokemon = (e) => {
    let regex = new RegExp(e.target.value, 'i'), elemId = ''
    this.state.pokeArray.forEach((elem) => {
      elemId = document.getElementById(elem.key)
      if (elem.key.match(regex)) {
        elemId.style.display = ''
      } else {
        elemId.style.display = 'none'
      }
    })
  }

  firstShowItems(pokemon, items) {
    let pokeArray = []
    for (let i = 0; i < items; i++) {
      pokeArray.push(<PokemonCard key={pokemon[i].name} name={pokemon[i].name} url={pokemon[i].url} />)
    }
    return pokeArray
  }

  showItems(pokemon, howMany) {
    let pokeArray = this.state.pokeArray, index = pokeArray.length, items = howMany + index       
    if(this.state.dataLoaded && index < 964) {
      for (index; index < items; index++) {
        pokeArray.push(<PokemonCard key={pokemon[index].name} name={pokemon[index].name} url={pokemon[index].url} />)
      }
      this.setState({pokeArray})
    }
  }

  render () {
    return (
      <div key="pokeList" ref="pokeScroller">
        <div className="row mx-auto navbar" style={{marginBottom: '1rem'}}>
          <div className="col-md-6 mx-auto">
            <h2 className='white-text'>Welcome, {app.auth().currentUser.displayName} - Filter Pokemon</h2>
            <div className="form-group">
              <input className="form-control" type="text" name="filter" onChange={e => {this.filterPokemon(e)}} />
            </div>
          </div>
        </div>
        <div className="row"> 
          {this.state.pokemon ? (
            this.state.pokeArray
          ) : null}
        </div>
      </div>
    )
  }
}