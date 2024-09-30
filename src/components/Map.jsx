import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents} from "leaflet";
import { useState } from 'react';
import { useCities } from '../contexts/CitiesContext';
import { useEffect } from 'react';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Button';
import { useUrlPosition } from '../hooks/useUrlPosition';

const Map = () => {
    const { cities } = useCities();
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const [searchParams] = useSearchParams();
    const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation(); 
    // const mapLat = searchParams.get("lat");
    // const mapLng = searchParams.get("lng");
    const [mapLat, mapLng] = useUrlPosition();
    const navigate = useNavigate();
    

     useEffect(() => {
        if(mapLat && mapLng){
            setMapPosition([mapLat, mapLng]);
        }
     }, [mapLat, mapLng])

     useEffect(() => {
        if(geolocationPosition){
            setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
        }
     }, [geolocationPosition] )

  return (
    <div className={styles.mapContainer} onClick={() => {
       navigate("form")}}>
      <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? "Loading..." : "Use your position"}
      </Button>
      <MapContainer 
          center={mapPosition} 
          zoom={13} 
          scrollWheelZoom={false} 
          className={styles.map}>

        <TileLayer 
           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
        OpenStreetMap</a>contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.mp((city) => (
      <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
          <Popup>
            <span>{city.emoji}</span>
            <span>{city.cityName}</span>
          </Popup>
      </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        </MapContainer>  

    </div>
  )
};


function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
    const navigate = useNavigate();
    
    useMapEvents({
        click: (e) => navigate(`form?lat=${e.lat}&lng=${e.lng}`)
    })
}


export default Map;
