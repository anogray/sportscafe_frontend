import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";

export default class Pokemon extends Component {
  state = {
    url: "https://pokeapi.co/api/v2/pokemon/?limit=200",
    pokemon: [],
    itemsCountPerPage: 20,
    activePage: 1
  };

  loadPokemon = () => {
    axios
      .get(this.state.url)
      .then(res => {
        this.setState(prevState => {
          const pokemons = prevState.pokemon;
          return {
            pokemon: [...prevState.pokemon, ...res.data.results],
            url: res.data.next
          };
        });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };

  render() {
     console.log(this.state.pokemon);
     if(this.state.pokemon){
      console.log("oye kaise aa gaya",this.state.pokemon);
     }
    return (
      <React.Fragment>
        {this.state.pokemon ? (
          
          <div className="row">
            {console.log("yes",this.state.pokemon)}
            <InfiniteScroll
              pageStart={0}
              loadMore={this.loadPokemon}
              hasMore={this.state.url}
              loader={
                <div className="loader" key={0}>
                  Loading ...
                </div>
              }
            >
              {this.state.pokemon.map((pokemon, i) => (
                <div
                  style={{ borderBottom: "1px solid", padding: "10px" }}
                  key={pokemon.name + i}
                >
                  <div>{pokemon.name}</div>
                  <div>{pokemon.url}</div>
                </div>
              ))}
            </InfiniteScroll>
          </div>
        ) : (
          <h1>Loading Pokemon
            {console.log("Loading Pokemon")}
          </h1>
        )}
      </React.Fragment>
    );
  }
}
