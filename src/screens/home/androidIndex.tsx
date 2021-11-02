/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {StyleSheet, View, Platform, Linking} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {widthPercentageToDP as WP} from 'react-native-responsive-screen';
//import BottomSheet from '@gorhom/bottom-sheet';
import {openSettings, PERMISSIONS, check} from 'react-native-permissions';
import LocationEnabler from 'react-native-location-enabler';
import GetLocation from 'react-native-get-location';
import {useSelector, useDispatch} from 'react-redux';
import getShadow from '@utils/shadow';
import {Headers, Cards, Stepper, GoogleMap, BottomSheet} from '@components';
import {Colors} from '@constants';
import {getStatus} from '@utils/libs';
import {InitialUserInterface} from '@constants/interfaces';
import ACTIONS from '@redux/actions';
const {
  PRIORITIES: {HIGH_ACCURACY},
  useLocationSettings,
} = LocationEnabler;
const HomeScreen = ({navigation, route}: {navigation: any; route: any}) => {
  const {bottom} = useSafeAreaInsets();
  const [status, setStatus] = useState<number>(0);
  const [distanceData, setDistanceData] = useState(null);
  const [current, setCurrent] = useState({latitude: 0, longitude: 0});
  const [enabled, requestResolution] = useLocationSettings(
    {
      priority: HIGH_ACCURACY, // default BALANCED_POWER_ACCURACY
      alwaysShow: true, // default false
      needBle: true, // default false
    },
    false /* optional: default undefined */,
  );
  const dispatch = useDispatch();
  const {detail, online} = useSelector(
    ({USER}: {USER: InitialUserInterface}) => USER,
  );
  useEffect(() => {
    if (!enabled && Platform.OS === 'android') {
      requestResolution();
    } else {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      })
        .then(location => setCurrent(location))
        .catch(error => {
          const {code, message} = error;
          console.warn(code, message);
        });
    }
  }, [enabled]);
  useEffect(() => {
    setStatus(online ? 1 : 0);
  }, [online]);
  //console.log('Location', current);
  return (
    <View style={style.screenCont}>
      <Headers.HeaderA
        navigation={navigation}
        title={getStatus(status)}
        renderRight={status !== 0}
        renderChild1={true}
      />
      {status < 2 && <Cards.StatusCard status={status === 1} />}
      {(status === 2 || status === 3) && (
        <Stepper step={status} lineTitle1="15min" lineTitle2="15min" />
      )}
      {status === 4 && (
        <Cards.DestinationCard
          title={
            'asfdasb bibi sdqd fwf fwfw fwf wfwf efwefwfwfwefwef fwefwwef wefwef'
          }
        />
      )}
      {/* {status === 5 && <Headers.SearchBar />} */}
      <View style={{flex: 1, overflow: 'scroll'}}>
        <GoogleMap
          status={status}
          setter={setDistanceData}
          myLocation={{latitude: 37.783, longitude: -122.4324}}
          locations={
            status !== 0
              ? {
                  hotel: {latitude: 37.787, longitude: -122.4324},
                  destination: {latitude: 37.79, longitude: -122.4324},
                  origin: {latitude: 37.783, longitude: -122.4324},
                }
              : null
          }
        />
        {status === 1 && (
          <Cards.OrderRequestCard
            onPress={() => {
              setStatus(2);
            }}
            style={{paddingBottom: bottom ? 5 + bottom : 20}}
          />
        )}
        {(status === 2 || status === 3 || status === 4) && (
          <Cards.riderDashBoardCard
            distanceData={distanceData}
            status={status}
            statusSetter={setStatus}
            style={{paddingBottom: bottom ? 5 + bottom : 20}}
          />
        )}
        {status === 5 && (
          <Cards.OrderDeliveredCard
            backPress={() => {
              setStatus(4);
            }}
            style={{
              paddingBottom: bottom ? 5 + bottom : 20,
              paddingTop: 50,
              width: WP(85),
            }}
            statusSetter={setStatus}
          />
        )}
      </View>
      <BottomSheet.BottomSheetSheetA
        status={online}
        setStatus={() => {
          ACTIONS.userToggleOnlineStatus()(dispatch);
        }}
      />
    </View>
  );
};
const style = StyleSheet.create({
  screenCont: {flex: 1},
  secBar: {height: 56, zIndex: 3, ...getShadow(3)},
  avatar: {width: 48, height: 48, resizeMode: 'contain'},
  line: {
    width: '100%',
    height: 1,
    borderColor: Colors.Grey6,
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  currentLocator: {
    width: 36,
    height: 36,
    borderRadius: 18,
    zIndex: 10,
    position: 'absolute',
    right: 15,
    ...getShadow(3),
  },
});
export default HomeScreen;
