/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef, Fragment} from 'react';
import {View, Image, useWindowDimensions, Platform} from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import MapView, {Marker, Circle} from 'react-native-maps';
import getShadow from '../utils/shadow';
import {Colors, Images, GOOGLE_MAPS_APIKEY} from '../constants';

type coordinate =
  | {
      latitude: number;
      longitude: number;
    }
  | undefined;
type allLocs =
  | {
      destination: coordinate;
      origin: coordinate;
      hotel: coordinate;
    }
  | undefined
  | null;
const GoogleMap = ({
  myLocation = {latitude: 0, longitude: 0},
  locations = undefined,
  setter = e => {},
  status = 0,
}: {
  myLocation?: coordinate;
  locations: allLocs;
  setter?: Function;
  status?: number;
}) => {
  const {width, height} = useWindowDimensions();
  const ASPECT_RATIO = width / height;
  const latitudeDelta = 0.015;
  const longitudeDelta = latitudeDelta * ASPECT_RATIO;
  const thisMap = useRef(null);
  const [ready, setReady] = useState(false);
  return (
    <MapView
      ref={thisMap}
      style={{flex: 1}}
      //provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_GOOGLE}
      region={{
        ...myLocation,
        latitudeDelta,
        longitudeDelta,
      }}>
      {locations !== undefined && locations !== null && (
        <Fragment>
          {locations.origin && (
            <CustomMarker icon={[Images.myLocation]} coord={locations.origin} />
          )}
          {/* {!ready && (
            <Circle
              center={locations.origin}
              radius={150}
              fillColor={Colors.transparentOrange}
              strokeColor={Colors.transparentOrange}
            />
          )} */}
          {locations.hotel !== undefined && (
            <CustomMarker
              icon={[Images.hotelRed, Images.hotel]}
              coord={locations.hotel}
              selected={status === 3}
            />
          )}
          {locations.destination !== undefined && (
            <CustomMarker
              icon={[Images.aimRed, Images.aim]}
              coord={locations.destination}
              selected={status === 4}
            />
          )}
          {locations.destination !== undefined && (
            <MapViewDirections
              origin={locations.origin}
              waypoints={locations.hotel !== undefined ? [locations.hotel] : []}
              destination={locations.destination}
              strokeColor={Colors.red}
              strokeWidth={Platform.OS === 'ios' ? 2 : 4}
              lineDashPattern={[4, 7]}
              apikey={GOOGLE_MAPS_APIKEY}
              onStart={params => {
                console.log(
                  `Started routing between "${params.origin}" and "${params.destination}"`,
                );
              }}
              onReady={result => {
                setReady(true);
                const {distance, duration, ...rest} = result;
                console.log(`Distance: ${distance} km.`);
                console.log(`Duration: ${duration} min.`);
                setter({distance, duration});
                console.log(`AllResult: ${JSON.stringify(rest)}`);
                const horizontal = width / 20;
                const vertical = height / 20;
                thisMap.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: horizontal,
                    bottom: vertical,
                    top: vertical,
                    left: horizontal,
                  },
                });
              }}
              onError={errorMessage => {
                console.log(`Error while GoogleMaping:\n`, errorMessage);
              }}
            />
          )}
        </Fragment>
      )}
    </MapView>
  );
};
const CustomMarker = ({
  coord = {longitude: 0, latitude: 0},
  icon = [],
  selected = false,
}: {
  coord?: coordinate;
  icon: Array<any>;
  selected?: Boolean;
}) => {
  return (
    <Marker coordinate={coord}>
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
          ...getShadow(3),
        }}>
        <Image
          source={selected ? icon[0] : icon.length > 1 ? icon[1] : icon[0]}
          style={{width: 45, height: 45, resizeMode: 'contain'}}
        />
      </View>
    </Marker>
  );
};
export default GoogleMap;
