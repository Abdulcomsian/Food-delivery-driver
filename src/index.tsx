/* eslint-disable react-native/no-inline-styles */
/**
 * @format
 **/
import React, {useEffect} from 'react';
import {View, Platform, StatusBar} from 'react-native';
import {Colors} from '@constants';
import MainNavigator from './navigator';
import {Store, persistor} from './redux';
import {PersistGate} from 'redux-persist/integration/react';
//import PushNotification, {Importance} from 'react-native-push-notification';
import {Provider} from 'react-redux';
const App = () => {
  useEffect(() => {
    Platform.OS === 'android' &&
      (StatusBar.setTranslucent(true),
      StatusBar.setBackgroundColor(Colors.transparent));
    // ,PushNotification.createChannel(
    //   {
    //     channelId: 'channel2020', // (required)
    //     channelName: 'messageChannel', // (required)
    //     playSound: false, // (optional) default: true
    //     soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    //     importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    //     vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    //   },
    //   created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    // )
    StatusBar.setBarStyle('dark-content', true);
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainNavigator />
        </PersistGate>
      </Provider>
    </View>
  );
};
//africeat.com.driver
export default App;
