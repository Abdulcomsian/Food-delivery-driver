import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Alert,
  Linking,
  Platform,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Geolocation from 'react-native-geolocation-service';
import {Colors, Images} from '@constants';
import {Buttons} from '@components';
import appConfig from '../../../app.json';
import Actions from '@redux/actions';
import {useDispatch} from 'react-redux';
const LocationSwitcher = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const {top, bottom} = useSafeAreaInsets();
  const dispatch = useDispatch();
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
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();
    if (!hasPermission) {
      return;
    }
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        Actions.letsEnableLocation()(dispatch);
        navigation.goBack();
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
  return (
    <View
      style={[
        style.screenCont,
        {
          paddingTop: top,
          paddingBottom: bottom,
        },
      ]}>
      <Image style={style.stateImage} source={Images.locationEnabler} />
      <Text style={style.mainTitle}>Enable Your Location</Text>
      <Text style={style.subTitle}>Choose your location to start find</Text>
      <Buttons.ButtonA
        style={style.btnStyle}
        title={'USE MY LOCATION'}
        onPress={getLocation}
      />
      <Buttons.ButtonA
        style={style.skipBtnStyle}
        textStyle={style.skipBtnTxtStyle}
        title={'Skip for now'}
        onPress={navigation.goBack}
      />
    </View>
  );
};
const style = StyleSheet.create({
  screenCont: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: WP(10),
  },
  mainTitle: {
    color: Colors.green,
    fontWeight: 'bold',
    fontSize: Platform.OS === 'android' ? 25 : 24,
    textAlign: 'center',
    marginVertical: hp(3.8),
  },
  subTitle: {
    fontSize: Platform.OS === 'android' ? 17 : 16,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: hp(3.5),
  },
  stateImage: {
    width: WP(70),
    height: WP(70),
    marginBottom: hp(3.5),
  },
  btnStyle: {backgroundColor: Colors.red, width: WP(65), marginVertical: 25},
  skipBtnStyle: {backgroundColor: Colors.transparent, width: WP(70)},
  skipBtnTxtStyle: {color: Colors.Grey5},
});

export default LocationSwitcher;
