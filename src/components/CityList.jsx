import React from 'react';
import cities from "../data/cities.json";
import City from "./City";
import { useCities } from '../contexts/CitiesContext';
import CityItem from "./CityItem";
import Message from "./Message";
import Spinner from "./Spinner";


const CityList = () => {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner  />;

  if(!cities.length) {
    return (
        <Message message="Add your first city by clicking a city on the map" />
    );
  }


  return (
    <ul className={StyleSheet.CityList}>
      {cities.map((city) =>  (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
