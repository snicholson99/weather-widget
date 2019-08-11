import React, { Component } from 'react';
import './WeatherWidget.css';

class WeatherWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: "",
      longitude: "",
    }
  }

  componentDidMount() {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(
        this.onGetLocSuccess, this.onGetLocError
      );
    }
  }

  onGetLocSuccess = (pos) => {
    const { latitude, longitude } = pos.coords;
    this.setState({ latitude, longitude })
  }

  onGetLocError = (err) => {
    console.error("Failed to getCurrentPosition", err);
  }

  render() {
    const { latitude, longitude } = this.state;
    return (
      <div className="weather-widget">
        <h1>Weather Widget</h1>
        <p>Latitude: {latitude}</p>
        <p>Longitude: {longitude}</p>
      </div>
    );
  }
}

export default WeatherWidget;
