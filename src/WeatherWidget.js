import React, { Component } from 'react';
import './WeatherWidget.css';
import WeatherCard from './WeatherCard.jsx';

class WeatherWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: "",
      longitude: "",
      weatherData: null,
    }
  }

  componentDidMount() {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(this.onGetLocSuccess, this.onGetLocError);
    }
  }
    
  getWeather = () => {
    const { latitude, longitude } = this.state;
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=0e1d93bd3bf9ef10851ee9a03bf40b5f`)
    .then(res => res.json())
    .then((weatherData) => this.setState({ weatherData }) )
    .catch(console.error)
  }

  onGetLocSuccess = (pos) => {
    const { latitude, longitude } = pos.coords;
    this.setState({ latitude, longitude }, this.getWeather);
  }

  onGetLocError = (err) => {
    console.error("Failed to getCurrentPosition", err);
  }

  render() {
    const { weatherData } = this.state;

    const formatDateTime = (dateTime, typeRequired) => {
      if (typeRequired === 'date') {
        const dateOnly = dateTime.substr(0, dateTime.indexOf(' '));
        const datePart = dateOnly.match(/\d+/g), year = datePart[0].substring(2), month = datePart[1], day = datePart[2];
        return day + '/' + month + '/' + year;
      } else {
        const timeOnly = dateTime.substr(dateTime.indexOf(' ') + 1);
        return timeOnly.split(':').slice(0, 2).join(':');
      }
    }

    if (weatherData) {
      return (
        <div className="weather-widget">
          <div className="location">
            <h1>{weatherData.city.name}</h1>
            <h5>Population: {weatherData.city.population}</h5>
          </div>
          <h3 className="subheading">Upcoming Forecast</h3>
          <div className="weather-widget__items">
            {weatherData.list.map(item => {
              const itemDate = item.dt_txt;
              return (
                <WeatherCard
                  key={item.dt}
                  date={formatDateTime(itemDate, 'date')}
                  time={formatDateTime(itemDate, 'time')}
                  weather={item.weather[0].main}
                  weatherDetailed={item.weather[0].description}
                />
              );
            })}
          </div>
        </div>
      );
    } else {
      return <p>Loading...</p>;
    }
  }
}

export default WeatherWidget;
