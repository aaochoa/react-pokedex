import React, { Component } from 'react'
import axios from 'axios'
import PokemonCard from './PokemonCard'
import app from '../base'

export default class PokemonList extends Component {
  constructor() {
    super()
    this.state = {
      url: "https://pokeapi.co/api/v2/pokemon/",
      pokemon: null,
      pokeElements : []
    }
  }

  async componentDidMount() {
    const res = await axios.get(this.state.url)
    let pokeArray = this.cards(res.data['results'])
    this.setState({
      pokemon: res.data['results'], 
      pokeElements: pokeArray
    })
  } 

  filterPokemon = (e) => {
    let regex = new RegExp(e.target.value, 'i'), elemId = ''
    this.state.pokeElements.forEach((elem) => {
      elemId = document.getElementById(elem.key)
      if (elem.key.match(regex)) {
        elemId.style.display = ''
      } else {
        elemId.style.display = 'none'
      }
    })
  }

  cards = (pokemon) => {
    let pokeArray = []
    pokemon.forEach(pokemon => {
      pokeArray.push(<PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />)
    })
    return pokeArray
  }
 
  render () {
    return (
      <div>
        <div className="row mx-auto navbar" style={{marginBottom: '1rem'}}>
          <div className="col-md-6 mx-auto">
            <h2 className='white-text'>Welcome, {app.auth().currentUser.displayName} - Filter Pokemon</h2>
            <div className="form-group">
              <input className="form-control" type="text" name="filter" onChange={e => {this.filterPokemon(e)}} />
            </div>
          </div>
        </div>
        {this.state.pokemon ? (
          <div className="row">
            {this.state.pokeElements}
          </div>
        ) : (
          <h1>Cargando...</h1>
        )}
      </div>
    )
  }
}