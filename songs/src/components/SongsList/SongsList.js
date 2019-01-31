import React from 'react';

const SongsList = ({ songs, selectedSong, selectSong }) => {
  return (
    <div className="songs-list-wrapper">
      <div className="list-group">
        {songs.map(song => {
          const featuredSong = song.id === selectedSong.id;
          return (
            <a
              key={song.id}
              href="#/"
              className={`list-group-item list-group-item-action list-group-item-info ${featuredSong ? 'active' : ''}`}
              onClick={() => selectSong(song)}
            >
              {song.title}
            </a>
          )
        })}

      </div>
    </div>
  )
}

export default SongsList;
