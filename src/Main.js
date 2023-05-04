import React from "react";
import { Button, Form } from 'react-bootstrap';

class Main extends React.Component {
  render() {
    return (
      <>
        
          <Form>
            <Form.Group>
              <Form.Label>Enter a city location for more information</Form.Label>
              <Form.Control type="text" placeholder="city name..." />
            </Form.Group>
            <Button>Explore!</Button>
          </Form>
      
      </>
    )
  }
}
export default Main;