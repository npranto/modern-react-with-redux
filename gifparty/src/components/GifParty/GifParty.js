import React, { Component } from 'react';
import axios from 'axios';

import './GifParty.css';

class GifParty extends Component {

  state = {
    search: '',
    gifs: [],
  }

  componentDidMount() {
    // this.fetchTrendingGifs()
  }

  async fetchTrendingGifs() {
    const response = await axios.get(`http://api.giphy.com/v1/gifs/trending?api_key=5vecOzdQ37uQfJKbsHyTgSyq2cQbERLb`);
    const trendingGifs = response.data.data;

    if (trendingGifs && trendingGifs.length) {
      this.setState({
        gifs: trendingGifs
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
    console.log(searchQuery);
  }

  render() {
    return (
      <div className="gif-party">
        <Search
          value={this.state.search}
          handleSearchSubmit={(e) => this.handleSearchSubmit(e)}
          handleSearchInputChange={(e) => this.handleSearchInputChange(e)}
        />
        <Gallery gifs={this.state.gifs} />
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
    <div className="gif-gallery">
      {
        (gifs || []).map(gif => <Gif src={gif.src} />)
      }
      <div className="column">
        <div className="ui segment">
          <img className="gif" alt="Gif" src="https://mtv.tumblr.com/post/120122363875/me-rn" />
        </div>
      </div>
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
