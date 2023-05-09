import React from "react";


class LocationIQ extends React.Component{
  render(){
    return(

        div className="selectCity">
        <p>{this.props.cityName}</p>
        <p>{this.props.lat}</p>
        <p>{this.props.lon}</p>
      )
  }
}

export default LocationIQ;