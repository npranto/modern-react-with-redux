import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';
import Auth from './../Auth/Auth';

const Header = () => {
  return (
    <div className="ui secondary menu Header">
      <Link to="/" className="item"><i className="huge podcast icon"></i></Link>
      <div className="right menu">
        <Link to="/" className="item">Streams</Link>
        <Link to="/streams/new" className="item">
          <button className="ui primary button">Create</button>
        </Link>
        <Link to="/" className="item">
          <Auth />
        </Link>
      </div>
    </div>
  )
};

export default Header;

