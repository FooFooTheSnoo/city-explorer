import React from "react";
const token = process.env.REACT_APP_LOCATIONIQ;


class Map extends React.Component {
  render() {

    let url = `https://maps.locationiq.com/v3/staticmap?key=${token}&center=${this.props.lat},${this.props.lon}&size=600x600&zoom=13&`
    return (
      <>
        <img src={url} alt="city map" />
      </>
    )
  }
}

export default Map;