import {
  Alert,
  Linking,
  Platform,
  ToastAndroid,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import messaging from '@react-native-firebase/messaging';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import PushNotification from 'react-native-push-notification';
// import {helperNavigate} from '../navigator/navigationHelper';
import {Store} from '@redux';
import appConfig from '../../app.json';
import APIs from './APIs';
import Actions from '../redux/actions';
//watchPosition(successCallback, ?errorCallback, ?options)
const putLocationListener = async (functionToPerf = cords => {}) => {
  if (Platform.OS === 'ios') {
    Geolocation.watchPosition(
      ({coords: {latitude, longitude}}) => {
        console.log('Live Location', JSON.stringify({latitude, longitude}));
        functionToPerf({latitude, longitude});
        Store.dispatch(Actions.updateLocation({latitude, longitude}));
      },
      ({code, message}) => {
        console.log('Error' + code, message);
      },
      {
        accuracy: {android: 'balanced', ios: 'bestForNavigation'},
        enableHighAccuracy: true,
        showLocationDialog: true,
        forceRequestLocation: true,
        useSignificantChanges: true,
        showsBackgroundLocationIndicator: true,
        distanceFilter: 100,
      },
    );
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'App needs to Access your location',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.watchPosition(
          ({coords: {latitude, longitude}}) => {
            console.log('Live Location', JSON.stringify({latitude, longitude}));
            functionToPerf({latitude, longitude});
            Store.dispatch(Actions.updateLocation({latitude, longitude}));
          },
          ({code, message}) => {
            console.log('Error' + code, message);
          },
          {
            accuracy: {android: 'balanced', ios: 'bestForNavigation'},
            enableHighAccuracy: true,
            showLocationDialog: true,
            forceRequestLocation: true,
            useSignificantChanges: true,
            showsBackgroundLocationIndicator: true,
            distanceFilter: 100,
          },
        );
      } else {
        //setLocationStatus('Permission Denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
};
const getStatus = (code: number) => {
  let status = 'Offline';
  switch (code) {
    case 0:
      status = 'Offline';
      break;
    case -1:
      status = 'Online';
      break;
    case 1:
      status = 'Online';
      break;
    case 2:
      status = 'Drive to';
      break;
    case 3:
      status = 'Pickup Order';
      break;
    case 4:
      status = 'Deliver To';
      break;
    case 5:
      status = 'Order Delivered';
      break;
    case 6:
      status = 'Online';
      break;
    default:
      status = 'Offline';
  }
  return status;
};
const passRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,30}$/g;

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const monthShortNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const weekDays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
const validateEmail = (email: String) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email.replace(/\s/g, ''),
  );
};
const emailIsValid = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const passwordValidator = (password: string) => {
  return passRegex.test(password);
};
const emailToUniqueString = (email: string): string =>
  email.replace(/[^a-zA-Z0-9 ]/g, '');
const getFormatedDate = (dateToBeFormated: string, short: boolean = false) => {
  const [day, month, year] = dateToBeFormated.split('-');
  const mmonth = parseInt(month, 10) - 1;
  const thisDay = new Date(parseInt(year, 10), mmonth, parseInt(day));
  return short
    ? `${day} ${monthShortNames[mmonth]}, ${parseInt(year, 10) % 100}`
    : `${weekDays[thisDay.getDay()]}, ${day} ${monthNames[mmonth]}, ${year}`;
};
const hasPermissionIOS = async () => {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Unable to open settings');
    });
  };
  const status = await Geolocation.requestAuthorization('whenInUse');

  if (status === 'granted') {
    return true;
  }

  if (status === 'denied') {
    Alert.alert('Location permission denied');
  }

  if (status === 'disabled') {
    Alert.alert(
      `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
      '',
      [
        {text: 'Go to Settings', onPress: openSetting},
        {text: "Don't Use Location", onPress: () => {}},
      ],
    );
  }

  return false;
};
const hasLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const hasPermission = await hasPermissionIOS();
    return hasPermission;
  }

  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(
      'Location permission revoked by user.',
      ToastAndroid.LONG,
    );
  }

  return false;
};
const getLocation = async (functionToPerf: Function) => {
  const hasPermission = await hasLocationPermission();
  if (!hasPermission) {
    return;
  }
  Geolocation.getCurrentPosition(
    position => {
      functionToPerf(position);
      console.log(position);
    },
    ({code, message}) => {
      console.log(`Code ${code}`, message);
    },
    {
      accuracy: {
        android: 'balanced',
        ios: 'nearestTenMeters',
      },
      enableHighAccuracy: true,
      timeout: 2000,
      maximumAge: 10000,
      distanceFilter: 0,
      forceRequestLocation: true,
      showLocationDialog: true,
    },
  );
};
const requestUserPermissionForMessaging = async () => {
  // const authStatus = await messaging().registerDeviceForRemoteMessages();
  // const authStatus = await PERMISSIONS.requestNotifications(['alert', 'sound']);
  const authStatus: any = await messaging().requestPermission();
  //console.log('Authorization status:', authStatus);
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL ||
    authStatus === true ||
    authStatus.status === 'granted';

  if (enabled) {
    //console.log('Authorization status:', authStatus);
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === true ||
      authStatus.status === 'granted'
    );
  }
  return Platform.OS === 'android';
};
const updateMyToken = (x1 = '', x2 = 0, getToken = (token: string) => {}) => {
  try {
    requestUserPermissionForMessaging().then(async res => {
      if (res) {
        const fcmToken = await messaging().getToken();
        console.log('FCM_Token', fcmToken);
        getToken(fcmToken);
      }
    });
  } catch (e) {
    console.log('FCM_Token_Error', e);
  }
};
const RemoteNavigation = (data: any) => {
  console.log('Here', JSON.stringify(data));

  const {status, pid, order_id} = data;
  if (status === 'assigned_to_driver') {
    //Store.dispatch(Actions.incomingOrder({}))
    APIs.getOrderDetail(order_id).then(res => {
      if (res) {
        const {data: rdata, status: rStatus} = res;
        if (rStatus) {
          if (rdata) {
            console.log('ResultBYAPI', rdata);
            getLocation(pos => {
              if (pos) {
                //console.log('POS', pos.coords);
                const {longitude, latitude} = pos.coords;
                Store.dispatch(
                  Actions.incomingOrder({
                    id: rdata.id,
                    hotel: {
                      latitude: parseFloat(rdata.restorant.lat),
                      longitude: parseFloat(rdata.restorant.lng),
                    },
                    destination: {
                      latitude: parseFloat(rdata.address?.lat),
                      longitude: parseFloat(rdata.address?.lng),
                    },
                    origin: {
                      latitude,
                      longitude,
                    },
                    order: rdata,
                  }),
                );
              }
            });
          }
        }
      }
    });
    // Actions.incomingOrder({
    //   id,
    //   hotel: {
    //     latitude: orderOrigin?.latitude + 0.007,
    //     longitude: orderOrigin?.longitude,
    //   },
    //   destination: {
    //     latitude: orderOrigin?.latitude - 0.007,
    //     longitude: orderOrigin?.longitude,
    //   },
    //   origin: {
    //     latitude: orderOrigin?.latitude,
    //     longitude: orderOrigin?.longitude,
    //   },
    //   items: [],
    // })(dispatch);
    // helperNavigate('donationHistoryScreen');
  } else if (status === 'reminder') {
    //helperNavigate('projectDetailScreen', {pid});
  }
};
export {
  RemoteNavigation,
  getStatus,
  getFormatedDate,
  emailIsValid,
  validateEmail,
  hasLocationPermission,
  getLocation,
  updateMyToken,
  putLocationListener,
};
