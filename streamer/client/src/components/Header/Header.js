import React from 'react';
import { Link } from 'react-router-dom';

import Auth from './../Auth/Auth';

const Header = () => {
  return (
    <div className="ui menu">
      <Link to="/" className="item"><i className="huge podcast icon"></i></Link>
      <div className="right menu">
        <Link to="/" className="item">Streams</Link>
        <Link to="/streams/new" className="item">
          <button className="ui primary button">Create</button>
        </Link>
        <Link to="/" className="item">
          <Auth google />
          <Auth />
        </Link>
      </div>
    </div>
  )
};

export default Header;

// clientID: '176049822610-ssmfek1csnk2s9h4g3o8lnk4f615ggle.apps.googleusercontent.com'
// clientSecret: 'SOiTuaXnZxOpPsCEvw7rvf4q'
