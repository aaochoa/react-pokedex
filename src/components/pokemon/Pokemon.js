import React, { Component } from 'react'
import Axios from 'axios'

export default class Pokemon extends Component {
    state = {
        imageUrl: '',
        pokemonIndex: '',
        name: '',
        types: '',
        height: '',
        weight: '',
        moves: '',
        evolutions: ''
    }

    async componentDidMount() {
        const {pokemonIndex} = this.props.match.params
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`
        const pokeRes = await Axios.get(pokemonUrl)
        const types = pokeRes.data.types.map(type => type.type.name);
        this.setState({imageUrl: pokeRes.data.sprites.front_default, pokemonIndex: pokemonIndex, name: pokeRes.data.name, types: types, height: pokeRes.data.height, weight: pokeRes.data.weight, moves: pokeRes.data.moves})
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
                                            <h5 className="card-title">Information</h5>
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
