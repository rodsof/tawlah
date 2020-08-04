import React from "react";

const Map = ({street_address, city, state}) => {
  console.log(city);
  return (
    <iframe
    style={{width: '100%', height: '500px'}}
      src = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDFfsSlkxl1DI0ztyZDRhOPKmIUhK1SuCw&q=City+Hall,New+York,NY"
    ></iframe>
  );
};

export default Map;