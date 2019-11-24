import React, { Component } from 'react'
import Axios from 'axios'

export default class Pokemon extends Component {
    state = {
        imageUrl: '',
        pokemonIndex: '',
        name: '',
        type: '',
        height: '',
        weight: '',
        moves: '',
        evolutions: ''
    }

    async componentDidMount() {
        const {pokemonIndex} = this.props.match.params
        console.log(pokemonIndex)
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`
        const pokeRes = await Axios.get(pokemonUrl)
        console.log(pokeRes)
        this.setState({imageUrl: pokeRes.data.sprites.front_default, pokemonIndex, name: pokeRes.data.name, types: pokeRes.data.types, height: pokeRes.data.height, weight: pokeRes.data.weight, moves: pokeRes.data.moves})
    }

    render() {
        return (
            <div className="card mb-3 text-center" style={{maxWidth: '50rem'}}>
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src={this.state.imageUrl} className="card-img-top" alt={`pokemon${this.state.name}`}/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-10">
                                    <h5 className="card-title">{`${this.state.pokemonIndex} ${this.state.name}`}</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Stats</h5>
                                            {this.state.types.map(elem => (
                                                <p>{elem.type.name}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
