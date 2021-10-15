import {
  Alert,
  Linking,
  Platform,
  ToastAndroid,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import appConfig from '../../app.json';
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
const passwordValidator = (password: string) => {
  return passRegex.test(password);
};
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
const emailToUniqueString = (email: string): string =>
  email.replace(/[^a-zA-Z0-9 ]/g, '');
const getFormatedDate = (dateToBeFormated: string, short: boolean = false) => {
  const [day, month, year] = dateToBeFormated.split('-');
  const mmonth = parseInt(month, 10) - 1;
  const thisDay = new Date(parseInt(year, 10), mmonth, parseInt(day));
  return short
    ? `${day} ${monthShortNames[mmonth]}, ${parseInt(year) % 100}`
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
    error => {
      Alert.alert(`Code ${error.code}`, error.message);
      console.log(error);
    },
    {
      accuracy: {
        android: 'balanced',
        ios: 'nearestTenMeters',
      },
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
      distanceFilter: 0,
      forceRequestLocation: true,
      showLocationDialog: true,
    },
  );
};
export {
  getStatus,
  getFormatedDate,
  emailIsValid,
  validateEmail,
  hasLocationPermission,
  getLocation,
};
