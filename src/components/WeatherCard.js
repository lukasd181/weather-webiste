import React, { Component } from "react";
import App from "../App";

export default class WeatherCard extends Component {
  convertF = (tempC) => {
    let tempF = tempC * 1.8 + 32;
    return Math.round(tempF);
  };

  render() {
    return (
      <div className="weatherCard">
        <h1>
          {this.props.temp}C/{this.convertF(this.props.temp)}F
        </h1>
        <h2> {this.props.description}</h2>
        <div>----------------------------------</div>
        <h3>
          {this.props.cityName}, {this.props.country}
        </h3>
        
      </div>
    );
  }
}
