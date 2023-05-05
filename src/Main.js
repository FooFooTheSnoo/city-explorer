import React from "react";
import { Button, Form } from 'react-bootstrap';

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      displayInfo: false

    }
  }

  // 1:13:35 for the first Video---------------

  handleExplore = (e) => {
    e.preventDefault();
    this.setState({displayInfo: true})
  }


  render() {
    return (
      <>
        
          <Form onSubmit={this.handleExplore}>
            <Form.Group>
              <Form.Label>Enter a city location for more information</Form.Label>
              <Form.Control type="text" placeholder="city name..." />
            </Form.Group>
            <Button type="submit">Explore!</Button>
            {this.state.displayInfo ?   
            <>
            <Map />
            </>
            :
            null
          }
          </Form>
      
      </>
    )
  }
}
export default Main;