import React from 'react';

const WeatherCard = ({ time, date, weather, weatherDetailed }) => {
  const selectIconClasses = (weather) => {
    switch (weather) {
      case 'Clear':
        return 'far fa-sun';
      case 'Sunny':
        return 'fas fa-sun';
      case 'Clouds':
        return 'fas fa-cloud';
      case 'Rain':
        return 'fas fa-cloud-rain';
      case 'Snow':
        return 'fas fa-snowflake';
      default:
        return '';
    }
  }
  return (
    <div className="card">
      <i className={selectIconClasses(weather)}></i>
      <p>{weatherDetailed}</p>
      <p>{date} at {time}</p>
    </div>
  );
}

export default WeatherCard;