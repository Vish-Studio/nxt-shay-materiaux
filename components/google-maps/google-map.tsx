import { FunctionComponent, useEffect, useState } from "react"
import {
  APIProvider,
  Map,
  Pin
} from '@vis.gl/react-google-maps';
import './styles.scss'

interface GoogleMapProps {
  zoom: number,
}

const googleMapKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

type TLocation = {
  lat: number;
  lng: number;
}
const silver = {
  silver: [
    {
      elementType: "geometry",
      stylers: [{ color: "#f5f5f5" }],
    },
    {
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#616161" }],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: "#f5f5f5" }],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [{ color: "#bdbdbd" }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#eeeeee" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#757575" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#e5e5e5" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9e9e9e" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [{ color: "#757575" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#dadada" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#616161" }],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9e9e9e" }],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [{ color: "#e5e5e5" }],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [{ color: "#eeeeee" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#c9c9c9" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9e9e9e" }],
    },
  ]
}

const GoogleMap: FunctionComponent<GoogleMapProps> = ({
  zoom
}) => {
  const [currentLoc, setCurrentLoc] = useState<TLocation>({
    lat: 0,
    lng: 0
  })


  useEffect(() => {
    navigator && navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLoc({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })
  }, [currentLoc])

  return (
    <APIProvider apiKey={googleMapKey}>
      <div className="google-maps">
        <Map
          zoomControl={true}
          styles={silver.silver}
          fullscreenControl={true}
          zoom={zoom}
          center={currentLoc}>
        </Map>
      </div >
    </APIProvider >
  )
}

export default GoogleMap;