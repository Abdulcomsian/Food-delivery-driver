import React, {Fragment, useEffect} from 'react';
import {StatusBar, Platform, PermissionsAndroid} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import {useSelector} from 'react-redux';
import {openSettings, PERMISSIONS, check} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
//======================[Screens]====================================
import Drawer from './Drawer';
import Login from '@screens/login';
import PhoneVerify from '@screens/phoneVerify';
//import PasswordReset from '@screens/passwordReset';
import Locationswitcher from '@screens/locationSwitcher';
import {Colors} from '@constants';
import {InitialUserInterface} from '@constants/interfaces';

//===================================================================
const {Navigator, Screen} = createStackNavigator();

const Stack = () => {
  const {loggedIn} = useSelector(
    ({USER}: {USER: InitialUserInterface}) => USER,
  );
  useEffect(() => {
    // PermissionsAndroid.PERMISSIONS[
    //   (PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    //   PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
    // ];
    // check('location').then(response => {
    //   console.log('location', response);
    //   if (response === 'granted') {
    //     Geolocation.getCurrentPosition(
    //       position => {
    //         console.log(position);
    //       },
    //       error => {
    //         // See error code charts below.
    //         //console.log(error.code, error.message);
    //       },
    //       {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    //     );
    //   }
    //   // response is: 'authorized', 'denied', 'restricted', or 'undetermined'
    // });
    SplashScreen.hide();
  }, []);
  return (
    <Navigator headerMode={'screen'}>
      {loggedIn ? (
        <Fragment>
          <Screen
            name={'drawer'}
            component={Drawer}
            options={{headerShown: false}}
          />
          <Screen
            name={'locationswitcher'}
            component={Locationswitcher}
            options={{headerShown: false}}
          />
        </Fragment>
      ) : (
        <Fragment>
          <Screen
            name={'login'}
            component={Login}
            options={{headerShown: false}}
          />
          <Screen
            name={'phoneVerification'}
            component={PhoneVerify}
            options={{headerShown: false}}
          />
        </Fragment>
      )}
      {/* <Screen
        name={'passwordReset'}
        component={PasswordReset}
        options={{headerShown: false}}
      /> */}
    </Navigator>
  );
};

export default Stack;
