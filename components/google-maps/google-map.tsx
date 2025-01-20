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

const GoogleMap: FunctionComponent<GoogleMapProps> = ({
  zoom
}) => {
  const [currentLoc, setCurrentLoc] = useState<TLocation>({
    lat: 0,
    lng: 0
  })


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLoc({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })
  }, [currentLoc])

  return (
    <APIProvider apiKey={googleMapKey}>
      <div className="google-maps">
        <Map zoom={zoom} center={currentLoc}></Map>
      </div>
    </APIProvider>
  )
}

export default GoogleMap;