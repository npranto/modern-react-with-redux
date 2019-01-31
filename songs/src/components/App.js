import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import SongsList from './SongsList/SongsList';
import SongDetails from './SongDetails/SongDetails';
import { fetchSongs, selectSong } from './../state/actions/songsActions';

class App extends Component {
  componentDidMount() {
    this.props.fetchSongs();
  }

  selectSong(song) {
    this.props.selectSong(song);
  }

  render() {
    return (
      <div className="App">
        <SongsList songs={this.props.songs} selectedSong={this.props.selectedSong} selectSong={(song) => this.selectSong(song)} />
        <SongDetails {...this.props.selectedSong} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    songs: state.songs.songs,
    selectedSong: state.songs.selectedSong || state.songs.songs[0],
  }
}

const mapDispatchToProps = {
  fetchSongs,
  selectSong,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
