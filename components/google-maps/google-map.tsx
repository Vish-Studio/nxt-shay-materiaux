import { FunctionComponent, useEffect } from "react"
import {
  APIProvider,
  Map,
  Pin
} from '@vis.gl/react-google-maps';
import './styles.scss'

interface GoogleMapProps {
  zoom: number,
  center?: {
    lat: number,
    lng: number
  }
}

const googleMapKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;


const GoogleMap: FunctionComponent<GoogleMapProps> = ({
  zoom,
  center
}) => {

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('Maps: ', position.coords.latitude, position.coords.longitude)
    })
  }, [])

  return (
    <APIProvider apiKey={googleMapKey}>
      <div className="google-maps">
        <Map zoom={zoom} center={{ lat: 54, lng: 100 }}></Map>
      </div>
    </APIProvider>
  )
}

export default GoogleMap;