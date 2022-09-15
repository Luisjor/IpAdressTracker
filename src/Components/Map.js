import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

export default function Maps(props) {

      /* Props passed here: 
        Data={publicData.position}
        IP={publicData.IP}
        loaded={loaded}
    */


  // Function to flyTo() current location
  const ChangeMapView = ({coords}) => {

    const map = useMap()
    map.flyTo(coords, map.getZoom(), {duration: 3})
    return null
  }

// Simplify coordinates
var positionValue = props.Data
    return(
      props.loaded === true ?

      // Map container

      <MapContainer ref={positionValue} center={positionValue} zoom={18} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={positionValue} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
        </Marker>
        <ChangeMapView coords={positionValue}/>
      </MapContainer>
      :

      // Spinner loading

      <div className='gridLoader'>
        <div className="spinner-3"></div>
      </div>
      
    )
} 