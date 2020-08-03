import React from "react";

const Map = ({location}) => {
  return (
    <iframe
    style={{width: '100%', height: '500px'}}
      src = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDFfsSlkxl1DI0ztyZDRhOPKmIUhK1SuCw&q=${location}"
    ></iframe>
  );
};

export default Map;