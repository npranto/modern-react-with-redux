import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Header.css';
import Auth from './../Auth/Auth';
import Auth2 from './../Auth2/Auth2';

const Header = ({ auth }) => {
  const { isAuthenticated } = auth;

  return (
    <div className="ui secondary menu Header">
      <Link to="/" className="item"><i className="huge podcast icon"></i></Link>

      <div className="right menu">
        <Link to="/" className="item">Streams</Link>

        {isAuthenticated &&
          <Link to="/streams/new" className="item">
            <button className="ui primary button">Create</button>
          </Link>
        }

        {/* <Link to="/" className="item">
          <Auth />
        </Link> */}

        <Link to="/" className="item">
          <Auth2 />
        </Link>
      </div>
    </div>
  )
};

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  }
}

export default connect(mapStateToProps)(Header);

