import React from 'react';
import './SeasonDisplay.css';

const SeasonDisplay = ({
  icon,
  description
}) => (
  <div className="SeasonDisplay">
    <div className="block condition-icon left">
      <img src={icon} alt="Icon" />
    </div>
    <div className="block condition-description">
      <h1>{description}</h1>
    </div>
    <div className="block condition-icon right">
      <img src={icon} alt="icon" />
    </div>
  </div>
);


export default SeasonDisplay;
