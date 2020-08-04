
import React from "react";

const Map = ({street_address, city, state}) => {
  city = city.replace(' ','+');
  street_address = street_address.replace(' ','+');
  state = state.replace(' ','+');
  return (
    <iframe
    style={{width: '70%', height: '400px'}}
      src = {"https://www.google.com/maps/embed/v1/place?key="+process.env.API_KEY+"&q="+street_address+','+city+','+state}
    ></iframe>
  );
};

export default Map;