import React, { Component } from 'react';

import api from './../../api';
import './GifParty.css';

class GifParty extends Component {

  state = {
    search: '',
    trendingGifs: [],
    searchedGifs: [],
  }

  componentDidMount() {
    this.fetchTrendingGifs()
  }

  async fetchTrendingGifs() {
    const response = await api.fetchTrendingGifs();
    if (response) {
      const trendingGifs = response.map(gif => {
        return {
          src: gif && gif.images && gif.images.original && gif.images.original.url,
          title: gif && gif.title
        }
      })
      if (trendingGifs && trendingGifs.length) {
        this.setState({
          trendingGifs
        })
      }
    }
  }

  async searchGifs(query) {
    const response = await api.searchGifs(query);
    if (response) {
      const searchedGifs = response.map(gif => {
        return {
          src: gif && gif.images && gif.images.original && gif.images.original.url,
          title: gif && gif.title
        }
      })
      if (searchedGifs && searchedGifs.length) {
        this.setState({
          searchedGifs
        })
      }
    }

  }

  handleSearchInputChange(e) {
    e.preventDefault();
    this.setState({
      search: e.target.value,
    });
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
        <Gallery
          gifs={!this.state.search ? this.state.trendingGifs : this.state.searchedGifs}
        />
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
      {(gifs || []).map(gif =>
        <Gif src={gif.src} alt={gif.title} />
      )}
    </div>
  )
}

class Gif extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageSpan: 0,
    }

    this.imageRef = React.createRef();
  }

  componentDidMount() {
    this.imageRef.current.addEventListener('load', () => this.setSpan())
  }

  setSpan() {
    const originalGifHeight = this.imageRef.current.clientHeight;

    // find the ratio of original height and current forced height through CSS grid
    const imageSpan = Math.ceil(originalGifHeight / 10);

    // sets how many grid to span to based on original height of gif
    this.setState({
      imageSpan
    })
  }

  render() {
    return (
      <div className="ui large image gif-segment" style={{
        gridRowEnd: `span ${this.state.imageSpan}`,
      }}>
        <img ref={this.imageRef} className="gif" alt="Gif" {...this.props} />
      </div>
    );
  }
}

export default GifParty;
