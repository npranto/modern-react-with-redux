import React, { Component } from 'react';

import SeasonDisplay from './components/SeasonDisplay/SeasonDisplay';
import SnowIcon from './asssets/images/snow-icon.png';
import SunnyIcon from './asssets/images/sunny-icon.png';
import Loading from './asssets/images/loading.gif';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      currentLocation: null,
      currentMonth: null,
      message: null,
    }

    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.getCurrentMonth = this.getCurrentMonth.bind(this);
  }

  componentDidMount() {
    // get current location of user
    this.getCurrentLocation();
    // get current month
    this.getCurrentMonth();
  }

  getCurrentLocation() {
    const onSuccess = (position) => {
      const { longitude, latitude } = position && position.coords && position.coords;
      if (longitude && latitude) {
        this.setState({
          ...this.state,
          currentLocation: {
            longitude,
            latitude,
          },
          isLoading: false,
        });
        console.log(this.state.currentLocation);
      }
    }
    const onError = (error) => {
      this.setState({
        ...this.state,
        message: error && error.message,
        isLoading: false,
      });
    }

    if (!navigator.geolocation){
      this.setState({
        ...this.state,
        message: 'Geolocation is not supported by your browser',
        isLoading: false,
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }

  async getCurrentMonth() {
    const currentMonth = await (new Date().getMonth());
    this.setState({
      ...this.state,
      currentMonth: currentMonth
    })
    console.log(this.state.currentMonth);
  }

  render() {
    // lofic for determining icon and description based on current location and month
    const { isLoading, currentLocation, currentMonth, message } = this.state;
    const isInNH = currentLocation && currentLocation.latitude >= 0;
    const isChilly = (
      (isInNH && (currentMonth < 2 || currentMonth >= 9)) ||
      (!isInNH && (currentMonth >= 2 || currentMonth < 9))
    )
    return (
      <div className="App">
        {isLoading && <img className="loading-bar" src={Loading} alt="Loading Icon" />}
        {currentLocation && (currentMonth !== null)
          ? (
            <SeasonDisplay 
              icon={isChilly ? SnowIcon : SunnyIcon} 
              description={isChilly ? 'Burr, it\'s chilly!' : 'Let\'s hit the beach!'}
            />
          ) 
          : message && <div>{message}</div>
        }
      </div>
    );
  }
}

export default App;
