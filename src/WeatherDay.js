import React from "react";
import { Card } from "react-bootstrap";

class WeatherDay extends React.Component {
  render() {
    console.log(this.props.weatherData);

    return (
      <div>
        {this.props.weatherData.map((day, idx) =>
          <Card
            key={idx}
            bg={'info'}
            text={'dark'}
            style={{ width: '30rem' }}
            className="mb-2">
            <Card.Header>{day.date}</Card.Header>
            <Card.Title>{day.description}</Card.Title>
            <Card.Text>High Temp:{day.max_temp},
              Low Temp:{day.low_temp}</Card.Text>

          </Card>
        )}
      </div>
    )
  }
}

export default WeatherDay;