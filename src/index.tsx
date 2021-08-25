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
import {Provider} from 'react-redux';
const App = () => {
  useEffect(() => {
    Platform.OS === 'android' &&
      (StatusBar.setTranslucent(true),
      StatusBar.setBackgroundColor(Colors.transparent));
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

export default App;
