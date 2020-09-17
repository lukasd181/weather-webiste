import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";
import WeatherCard from "./components/WeatherCard";

let apikey = process.env.REACT_APP_APIKEY;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherObj: {},
      cityName: "Ho Chi Minh",
      isLoading: true,
    };
  }

  getLocation  = () => {
    navigator.geolocation.getCurrentPosition((post) => {
      this.getWeatherByCurrentLocation(post.coords.longitude, post.coords.latitude)
    })
  }

getWeatherByCurrentLocation = async (lon,lat) => {
  let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    console.log("data", data);
    this.setState({ weatherObj: data, isLoading: false });
}

  getWeather = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.cityName}&appid=${apikey}&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    console.log("data", data);
    this.setState({ weatherObj: data, isLoading: false });
  };

  searchByCity = (e) => {
    e.preventDefault();
    this.getWeather();
  };

  getCityName = () => {
    return this.state.weatherObj.name;
  };

  getTemp = () => {
    return Math.round(this.state.weatherObj.main.temp);
  };

  getCountry = () => {
    return this.state.weatherObj.sys.country;
  };

  getDescription = () => {
    return this.state.weatherObj.weather[0].description;
  };

  getMessage = () => {
    return this.state.weatherObj.message;
  }

  setDefaultHaNoi = () => {
    return this.setState({...this.state, citeName : "hanoi"});
  }

  componentDidMount() {
    this.getLocation();
  }

  render() {
    if (this.state.isLoading) {
      return (<h1>LOADING</h1>);
    }

    if (this.getMessage() === "city not found") {
      return (
        <div>
        <Navbar bg="light" expand="md">
          <Navbar.Brand href="#home">getTemp</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Form onSubmit={(e) => this.searchByCity(e)} inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={(e) => {
                  console.log("value", e.target.value);
                  this.setState({ ...this.state, cityName: e.target.value });
                }}
              />
              <Button variant="outline-success" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <h1>City not found</h1>
        </div>

      )

    }

    return (
      <div>
        <Navbar bg="light" expand="md">
          <Navbar.Brand href="#home">getTemp</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Form onSubmit={(e) => this.searchByCity(e)} inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={(e) => {
                  console.log("value", e.target.value);
                  this.setState({ ...this.state, cityName: e.target.value });
                }}
              />
              <Button variant="outline-success" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <div className="weatherDisplay">
          <WeatherCard
            cityName={this.getCityName()}
            temp={this.getTemp()}
            description={this.getDescription()}
            country={this.getCountry()}
          ></WeatherCard>
        </div>
      </div>
    );
  }
}
