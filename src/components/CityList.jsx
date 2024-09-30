import React from 'react';
import cities from "../data/cities.json";
import City from "../components/City";

const CityList = () => {
  return (
    <div>
      {cities.map((city) =>  (
        <City key={city.id} city={city} />
      ))}
    </div>
  )
}

export default CityList;
