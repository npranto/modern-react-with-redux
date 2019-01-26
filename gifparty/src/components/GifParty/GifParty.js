import React, { Component } from 'react';
import axios from 'axios';

import './GifParty.css';

class GifParty extends Component {

  state = {
    search: '',
    trendingGifs: [],
    searchedGifs: [],
  }

  componentDidMount() {
    this.fetchTrendingGifs()
    this.searchGifs('nba');
  }

  async fetchTrendingGifs() {
    const response = await axios.get(`http://api.giphy.com/v1/gifs/trending?api_key=5vecOzdQ37uQfJKbsHyTgSyq2cQbERLb`);
    const data = response && response.data && response.data.data;
    const trendingGifs = data && data.map(gif => {
      return {
        src: gif && gif.images && gif.images.original && gif.images.original.url,
        title: gif && gif.title
      }
    })
    console.log({ trendingGifs });
    if (trendingGifs && trendingGifs.length) {
      this.setState({
        trendingGifs
      })
    }
  }

  async searchGifs(query) {
    const response = await axios.get(`http://api.giphy.com/v1/gifs/search?api_key=5vecOzdQ37uQfJKbsHyTgSyq2cQbERLb&q=${query}`);
    const data = response && response.data && response.data.data;
    const searchedGifs = data && data.map(gif => {
      return {
        src: gif && gif.images && gif.images.original && gif.images.original.url,
        title: gif && gif.title
      }
    })
    console.log({ searchedGifs });
    if (searchedGifs && searchedGifs.length) {
      this.setState({
        searchedGifs
      })
    }
  }

  handleSearchInputChange(e) {
    e.preventDefault();
    this.setState({
      search: e.target.value,
    });
    console.log(this.state.search);
  }

  handleSearchSubmit(e) {
    e.preventDefault();
    const searchQuery = this.state.search;
    if (searchQuery) {
      this.searchGifs(searchQuery)
    }
  }

  render() {
    return (
      <div className="gif-party">
        <Search
          value={this.state.search}
          handleSearchSubmit={(e) => this.handleSearchSubmit(e)}
          handleSearchInputChange={(e) => this.handleSearchInputChange(e)}
        />
        <Gallery gifs={!this.state.search ? this.state.trendingGifs : this.state.searchedGifs} />
      </div>
    )
  }

}

const Search = ({
  value,
  handleSearchInputChange,
  handleSearchSubmit,
}) => {
  return (
    <div className="search-wrapper">
      <form onSubmit={(e) => handleSearchSubmit(e)}>
        <div className="ui input">
          <input
            name="search"
            type="text"
            value={value}
            placeholder="Search..."
            onChange={(e) => handleSearchInputChange(e)}
          />
        </div>
        <button className="ui button clear">Clear</button>
      </form>
    </div>
  )
}

const Gallery = ({ gifs }) => {
  return (
    <div className="ui three column grid gif-gallery">
      {
        (gifs || []).map(gif => <Gif src={gif.src} alt={gif.title} />)
      }
    </div>
  )
}

const Gif = (props) => {
  return (
    <div className="column">
      <div className="ui segment">
        <img className="gif" alt="Gif" {...props} />
      </div>
    </div>
  )
};

export default GifParty;
