import React, { Component } from "react"
import { Link } from 'react-router-dom'
import styled from "styled-components"

import spinner from "../spinner.gif"

const Sprite = styled.img`
  width: 7rem;
  height: 7rem;
  margin-top: 0;
  display: none;
`

const Card = styled.div`
  opacity: 0.95;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  -moz-user-select: none;
  -website-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }`

export default class PokemonCard extends Component {
  state = {
    name: "",
    imageUrl: "",
    pokemonIndex: "",
    imageLoading: true,
    toManyRequests: false
  }

  componentDidMount() {
    const { name, url } = this.props
    const pokemonIndex = url.split("/")[url.split("/").length - 2]
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`

    this.setState({ name, imageUrl, pokemonIndex });
  }

  render() {
    return (
      <div className="col-md-3 col-sm-4 mb-2" id={this.state.name}>
        <StyledLink className="card-link" to={`pokemon/${this.state.pokemonIndex}`} target="_blank"> 
          <Card className="card text-white bg-danger mb-3">
            <h5 className="card-header">{this.state.pokemonIndex}</h5>
             {this.state.toManyRequests ? (
                <h6 className="mx-auto">
                <span className="badge badge-danger mt-2">To Many Requests</span>
                </h6>
             ) : null}
            <div className="card-body mx-auto">
              <h6 className="card-title">
                  {this.state.name.split(" ").map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(" ")}
              </h6>
              {this.state.imageLoading ? (
                  <img src={spinner} style={{ width: "5em", height: "5em" }} alt={`pokemon${this.state.pokemonIndex}`} className="card-img-mid rounded mx-auto d-block mt-2"/>
              ) : null}
              <Sprite className="card-img-top rounded mx-auto mt-2" src={this.state.imageUrl} onLoad={() => this.setState({ imageLoading: false })} onError={() => this.setState({ toManyRequests: true })}
              style={ this.state.toManyRequests ? { display: "none" } : this.state.imageLoading ? null : { display: "block" }}/>
            </div>
          </Card>
        </StyledLink>
      </div>
    )
  }
}