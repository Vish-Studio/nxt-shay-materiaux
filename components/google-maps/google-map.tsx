'use client';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import {
  AdvancedMarker,
  APIProvider,
  ControlPosition,
  Map,
  MapCameraChangedEvent,
  MapCameraProps,
  MapControl,
  Pin,
  useApiIsLoaded
} from '@vis.gl/react-google-maps';
import './styles.scss';
import ButtonFab from '../button-fab/button-fab';

interface GoogleMapProps {
  zoom: number;
  clickAddLoc: (e: TLocation) => void;
  lat?: number;
  lng?: number;
}

const googleMapKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
const googleMapID: string = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID as string;

export type TLocation = {
  lat: number;
  lng: number;
};

const GoogleMap: FunctionComponent<GoogleMapProps> = ({ zoom, clickAddLoc, lat, lng }) => {
  const apiIsLoaded = useApiIsLoaded();
  const [currentLoc, setCurrentLoc] = useState<TLocation>({
    lat: -20.271657,
    lng: 57.4746666
  });
  const [cameraProps, setCameraProps] = useState<MapCameraProps>({ center: { lat: currentLoc.lat, lng: currentLoc.lng }, zoom: zoom });
  const handleCameraChange = useCallback((ev: MapCameraChangedEvent) =>
    setCameraProps(ev.detail)
    , []);


  useEffect(() => {
    if (apiIsLoaded) {
      navigator &&
        navigator.geolocation.getCurrentPosition((position) => {
          setCurrentLoc({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        });
    }
  }, [apiIsLoaded]);


  return (
    <APIProvider apiKey={googleMapKey}>
      <div className="google-maps">
        <Map
          mapId={googleMapID}
          zoomControl={true}
          fullscreenControl={false}
          defaultZoom={zoom}
          defaultCenter={currentLoc}
          gestureHandling={'greedy'}
          {...cameraProps}
          onCameraChanged={handleCameraChange}
        >
          <MapControl position={ControlPosition.BOTTOM_RIGHT}>
            <ButtonFab
              className="btn-add-loc"
              icon="add"
              type="mini"
              clickHandler={() => clickAddLoc(currentLoc)}
            />
            <ButtonFab
              className="btn-my-loc"
              type="mini"
              icon="my_location"
              clickHandler={() => setCameraProps({ center: { lat: currentLoc.lat, lng: currentLoc.lng }, zoom: zoom })}
            />
          </MapControl>
          <AdvancedMarker position={currentLoc}>
            <Pin background={'#1d1d1d'} borderColor={'#1d1d1d'} glyphColor="#fff" />
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
};

export default GoogleMap;
