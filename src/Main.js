import React from "react";
import { Button, Form, ListGroup } from 'react-bootstrap';
import LocationIQ from "./LocationIQ";
import axios from "axios";
import Map from "./Map";
import Error from "./Error";
import WeatherDay from "./WeatherDay";
import Movie from "./Movie";
const token = process.env.REACT_APP_LOCATIONIQ
const localToken = process.env.REACT_APP_SERVER

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayInfo: false,
      city: '',
      cityName: '',
      lat: '',
      lon: '',
      error: false,
      weatherData: [],
      movieData: []
    }
  }

  handleInput = (e) => {
    e.preventDefault();
    this.setState({ city: e.target.value }
      // , () => console.log(this.state.city)
    )
  }

  handleExplore = async (e) => {
    e.preventDefault();
    try {
      let url = `https://us1.locationiq.com/v1/search?key=${token}&q=${this.state.city}&format=json`;
      const response = await axios.get(url)

      const lat = response.data[0].lat;
      const lon = response.data[0].lon;
      let weatherUrl = `${localToken}/weather?lat=${lat}&lon=${lon}&searchQuery=${this.state.city}`
      const weatherResponse = await axios.get(weatherUrl)
      let movieUrl = `${localToken}/movie?film=${this.state.city}`
      const movieResponse = await axios.get(movieUrl)

      this.setState({
        displayInfo: true,
        error: false,
        cityName: response.data[0].display_name,
        lat: response.data[0].lat,
        lon: response.data[0].lon,
        weatherData: weatherResponse.data,
        movieData: movieResponse.data
      },
        () => console.log(this.state.weatherData)
      )
    }
    catch (error) {
      console.error('Does not compute. Try again')
      this.setState({
        displayInfo: false,
        error: true,

      })
    };
  }

  render() {
    return (
      <>
        <Form onSubmit={this.handleExplore}>
          <Form.Group>
            <Form.Label>Enter a city location for more information</Form.Label>
            <Form.Control type="text" placeholder="City..." onChange={this.handleInput} />
          </Form.Group>
          <Button type="submit">Explore!</Button>
          {this.state.displayInfo &&
            <>
              {/* <LocationIQ /> */}
              <ListGroup>
                <ListGroup.Item>{this.state.cityName}</ListGroup.Item>
                <ListGroup.Item>Latitude: {this.state.lat}</ListGroup.Item>
                <ListGroup.Item>Longitude: {this.state.lon}</ListGroup.Item>
              </ListGroup>

              <WeatherDay
                weatherData={this.state.weatherData}
              />

              <Map
                lat={this.state.lat}
                lon={this.state.lon}
              />

              <LocationIQ
                cityName={this.state.cityName}
                cityLat={this.state.cityLat}
                cityLon={this.state.cityLon}
              />

              <Movie
                movieData={this.state.movieData}
              />



            </>

          }
        </Form>
        {this.state.error &&
          <>
            <Error />
          </>
        }
      </>)
  }
}

export default Main;