import React from "react";
import { Button, Form, ListGroup } from 'react-bootstrap';
import axios from "axios";
import Map from "./Map";
import Error from "./Error";
import LocationIQ from "./LocationIQ";
const token = process.env.REACT_APP_LOCATIONIQ;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayInfo: false,
      city: '',
      cityName: '',
      lat: '',
      lon: '',
      error: false

    }
  }

  handleInput = (e) => {
    this.setState({ city: e.target.value }
      , () => console.log(this.state.city)
    );
  }

  handleExplore = async (e) => {
    e.preventDefault();
    try {
      let url = `https://us1.locationiq.com/v1/search?key=${token}&q=${this.state.city}&format=json`
      const response = await axios.get(url)
      console.log(response.data[0]);
      this.setState({
        displayInfo: true,
        cityName: response.data[0].display_name,
        lat: response.data[0].lat,
        lon: response.data[0].lon
      })
    }
    catch { this.setState({ error: true }) };
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
              <LocationIQ />
              <ListGroup>
                <ListGroup.Item>{this.state.cityName}</ListGroup.Item>
                <ListGroup.Item>Latitude: {this.state.lat}</ListGroup.Item>
                <ListGroup.Item>Longitude: {this.state.lon}</ListGroup.Item>
              </ListGroup>

              <Map
                lat={this.state.lat}
                lon={this.state.lon}
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