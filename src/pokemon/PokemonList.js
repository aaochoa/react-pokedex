import React, { Component } from 'react'
import axios from 'axios'
import PokemonCard from './PokemonCard'
import app from '../base'
import InfiniteScroll from "react-infinite-scroller"

export default class PokemonList extends Component {
  constructor() {
    super()
    this.state = {
      url: "https://pokeapi.co/api/v2/pokemon/?limit=964",
      pokemon: null,
      pokeElements : [],
      items: 43,
      dataLoaded: false,
      hasMoreItems: true
    }
  }
  
  async componentDidMount() {
    const res = await axios.get(this.state.url)
    let pokeArray = this.cards(res.data['results'])
    this.setState({
      pokemon: res.data['results'], 
      pokeElements: pokeArray,
      dataLoaded: true
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
    let pokeCardsArray = []
    if (pokemon.length > 0) {
      for (let i = 0; i < this.state.items; i++) {
        if (i < 964) {
          pokeCardsArray.push(<PokemonCard key={pokemon[i].name} name={pokemon[i].name} url={pokemon[i].url} />)
        }
      }
      return pokeCardsArray
    } else return <h1>Loading...</h1>
  }

  loadMore() {
    if (this.state.items < 963) {
      this.setState({ hasMoreItems: false})
    } else {
      setTimeout(() => {
        this.setState({ items: this.state.items + 40})
      }, 2000)
    }
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
        <InfiniteScroll className="row" key="scroller" id="scroller" loadMore={this.loadMore.bind(this)} hasMore={this.state.hasMoreItems} loader={<div className="loader"> Loading... </div>} useWindow={false}>
          {this.state.pokemon ? (
            this.cards(this.state.pokemon)
          ) : (
            <h1>Loading...</h1>
          )}
        </InfiniteScroll>
      </div>
    )
  }
}