import React from 'react';

const Header = () => {
  return (
    <div className="ui menu">
      <a className="item">Browse</a>
      <a className="item">Submit</a>
      <div className="right menu">
        <a className="item">Sign Up</a>
        <a className="item">Help</a>
      </div>
    </div>
  )
};

export default Header;
