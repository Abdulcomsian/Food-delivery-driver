/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  PermissionsAndroid,
  StyleSheet,
  Platform,
  View,
  Alert,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {widthPercentageToDP as WP} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import getShadow from '@utils/shadow';
import {navigationRef} from '@navigator/navigationHelper.ts';
import {
  Headers,
  Cards,
  Stepper,
  GoogleMap,
  BottomSheet,
  Special,
} from '@components';
import {Colors} from '@constants';
import {
  InitialUserInterface,
  OrdersStatesInterface,
  AppStatesInterface,
} from '@constants/interfaces';
import {getStatus} from '@utils/libs';
import ACTIONS from '@redux/actions';

const HomeScreen = ({navigation, route}: {navigation: any; route: any}) => {
  const {bottom} = useSafeAreaInsets();
  const locRef = useRef(null);
  const [status, setStatus] = useState<number>(0);
  const [distanceData, setDistanceData] = useState(null);
  const [limitReached, setLimitReached] = useState(false);
  const [showQueued, setShowQueued] = useState(false);
  const [viewNewOrder, setViewNewOrder] = useState(false);
  const [current, setCurrent] = useState({latitude: 0, longitude: 0});
  const dispatch = useDispatch();
  const {
    detail,
    online,
    ordersPending,
    currentOrder,
    incomingOrder,
    locationEnabled,
  } = useSelector(
    ({
      USER,
      ORDERS,
      APP,
    }: {
      USER: InitialUserInterface;
      ORDERS: OrdersStatesInterface;
      APP: AppStatesInterface;
    }) => ({...USER, ...ORDERS, ...APP}),
  );
  useEffect(() => {
    setStatus(online ? 1 : 0);
    if (online) {
      const requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
          subscribeLocationLocation();
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: 'Location Access Required',
                message: 'This App needs to Access your location',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              subscribeLocationLocation();
            } else {
              //setLocationStatus('Permission Denied');
            }
          } catch (err) {
            console.warn(err);
          }
        }
      };
      requestLocationPermission();
    } else {
      locRef.current && Geolocation.clearWatch(locRef.current);
      setTimeout(() => {
        locRef.current = null;
      }, 1000);
    }
    return () => {
      locRef.current && Geolocation.clearWatch(locRef.current);
    };
  }, [online]);
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
          } else {
            //setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
  }, []);

  const getOneTimeLocation = () => {
    // setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        setCurrent(position.coords);
        ACTIONS.setOrderOrigin(position.coords)(dispatch);
        console.log('OneTime Location: \n', position);
      },
      error => {
        //setLocationStatus(error.message);
      },
      {
        accuracy: {android: 'balanced', ios: 'nearestTenMeters'},
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const subscribeLocationLocation = () => {
    locRef.current = Geolocation.watchPosition(
      position => {
        console.log('Updated Location: \n', position);
        setCurrent(position.coords);
        ACTIONS.setOrderOrigin(position.coords)(dispatch);
      },
      error => {
        //setLocationStatus(error.message);
      },
      {
        accuracy: {android: 'balanced', ios: 'hundredMeters'},
        showLocationDialog: true,
        interval: 2000,
        useSignificantChanges: true,
        showsBackgroundLocationIndicator: true,
      },
    );
  };
  // console.log('Location', current);
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
        <Headers.NewRequest
          showing={
            incomingOrder !== null && !viewNewOrder && currentOrder !== null
          }
          setShowing={setViewNewOrder}
        />
        <GoogleMap
          status={status}
          setter={setDistanceData}
          myLocation={current}
          locations={
            (currentOrder === null && incomingOrder !== null) ||
            (viewNewOrder && incomingOrder !== null)
              ? incomingOrder
              : showQueued
              ? ordersPending[0]
              : currentOrder !== null
              ? currentOrder
              : {
                  origin: current,
                }
          }
        />
        {/* {status === 1 && (
          <Cards.OrderRequestCard
            onPress={() => {
              setStatus(2);
            }}
            style={{paddingBottom: bottom ? 5 + bottom : 20}}
          />
        )} */}
        {(status === 2 || status === 3 || status === 4) && (
          <Cards.riderDashBoardCard
            distanceData={distanceData}
            status={status}
            putitAsCurr={() => {
              ACTIONS.setAsInProgress()(dispatch);
            }}
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
            statusSetter={() => {
              setStatus(6);
              ACTIONS.orderCompleted()(dispatch);
            }}
          />
        )}
        {(viewNewOrder === true ||
          (incomingOrder !== null && (status === 1 || status === 6))) && (
          <Cards.AnOtherOrderRequestCard
            distanceData={distanceData}
            onPress={() => {
              if (currentOrder === null) {
                setStatus(3);
                ACTIONS.setAsInProgress()(dispatch);
              } else {
                ordersPending.length === 0
                  ? ACTIONS.addToPending()(dispatch)
                  : (setLimitReached(true),
                    ACTIONS.resetIncomingOrder()(dispatch));
                setViewNewOrder(false);
              }
            }}
            onPress2={() => {
              ACTIONS.resetIncomingOrder()(dispatch);
              setViewNewOrder(false);
            }}
            style={{paddingBottom: bottom ? 5 + bottom : 20}}
          />
        )}
        {showQueued && (
          <Cards.QueuedOrderRequestCard
            distanceData={distanceData}
            onPress={() => {
              if (currentOrder) {
                Alert.alert(
                  'Are you sure?',
                  'You have 1 order still in progress. Want to swipe with it?',
                  [
                    {
                      text: 'No',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'Yes',
                      onPress: () => {
                        setStatus(3);
                        ACTIONS.addPendingToInProgress()(dispatch);
                      },
                    },
                  ],
                );
              } else {
                ACTIONS.addPendingToInProgress()(dispatch);
                setStatus(3);
              }
              setShowQueued(false);
            }}
            onPress2={() => {
              setShowQueued(false);
            }}
            style={{paddingBottom: bottom ? 5 + bottom : 20}}
          />
        )}
        <Special.FloatingTopLeftBtn
          queued={ordersPending.length}
          setShow={setShowQueued}
        />
      </View>
      <Cards.LimitCardModal
        visible={limitReached}
        setVisible={setLimitReached}
      />
      <BottomSheet.BottomSheetSheetA
        status={online}
        setStatus={() => {
          if (locationEnabled) {
            ACTIONS.userToggleOnlineStatus()(dispatch);
          } else {
            navigationRef.current.navigate('locationswitcher');
          }
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
