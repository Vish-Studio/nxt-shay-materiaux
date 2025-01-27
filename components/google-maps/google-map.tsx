'use client';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import {
  AdvancedMarker,
  AdvancedMarkerAnchorPoint,
  APIProvider,
  ControlPosition,
  Map,
  MapCameraChangedEvent,
  MapCameraProps,
  MapControl,
  useApiIsLoaded
} from '@vis.gl/react-google-maps';
import './styles.scss';
import ButtonFab from '../button-fab/button-fab';
import Icon from '../icon/icon';
import marker from '../../public/icons/marker.png';

interface GoogleMapProps {
  zoom: number;
  clickAddLoc: (e: TLocation) => void;
}

const googleMapKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
const googleMapID: string = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID as string;

export type TLocation = {
  lat: number;
  lng: number;
};

const GoogleMap: FunctionComponent<GoogleMapProps> = ({ zoom, clickAddLoc }) => {
  const apiIsLoaded = useApiIsLoaded();
  const [currentLoc, setCurrentLoc] = useState<TLocation>({
    lat: -20.271657,
    lng: 57.4746666
  });

  useEffect(() => {
    navigator &&
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLoc({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
  }, []);

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
              clickHandler={() => {}}
            />
          </MapControl>
          <AdvancedMarker position={currentLoc}>
            <img
              src={marker.src}
              width={45}
              height={45}
            />
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
};

export default GoogleMap;
