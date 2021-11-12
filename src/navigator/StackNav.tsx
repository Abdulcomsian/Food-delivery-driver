import React, {Fragment, useEffect} from 'react';
import {Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
//======================[Screens]====================================
import Drawer from './Drawer';
import Login from '@screens/login';
import PhoneVerify from '@screens/phoneVerify';
import OrderDetail from '@screens/orderDetail';
//import PasswordReset from '@screens/passwordReset';
import Geolocation from 'react-native-geolocation-service';
import Locationswitcher from '@screens/locationSwitcher';
import {InitialUserInterface} from '@constants/interfaces';
import APIs from '@utils/APIs';
import {
  RemoteNavigation,
  updateMyToken,
  putLocationListener,
} from '@utils/libs';
import {Store} from '@redux';
//import Actions from '../../src/redux/actions';
//===================================================================

const {Navigator, Screen} = createStackNavigator();

const Stack = () => {
  const {loggedIn, online} = useSelector(
    ({USER}: {USER: InitialUserInterface}) => USER,
  );
  useEffect(() => {
    updateMyToken('nn', 0, token => {
      console.log('token', token);
    });
    SplashScreen.hide();
  }, []);
  useEffect(() => {
    PushNotification.popInitialNotification(notification => {});
    if (loggedIn) {
      PushNotification.configure({
        onNotification: ({userInteraction, data, finish}) => {
          finish(PushNotificationIOS.FetchResult.NoData);
          if (userInteraction) {
            if (data.status === 'assigned_to_driver') {
              setTimeout(() => {
                APIs.getOrderDetail(data.order_id).then(res => {
                  if (res && res.status) {
                    RemoteNavigation({...res.data, ...data});
                  }
                });
              }, 1000);
            }
          }
        },
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
        popInitialNotification: true,
        requestPermissions: true,
      });
      getNotifications();
      const unsubscribe = messaging().onMessage(remoteMessage => {
        console.log(
          'A new FCM message arrived!',
          JSON.stringify(remoteMessage.data),
        );

        Platform.OS === 'ios' &&
          PushNotificationIOS.addNotificationRequest({
            id: new Date().toString(),
            title: remoteMessage.notification?.title,
            body: remoteMessage.notification?.body,
            category: 'userAction',
            userInfo: remoteMessage.data,
          });

        // : PushNotification.localNotification({
        //     autoCancel: false,
        //     title: remoteMessage.notification?.title,
        //     message: remoteMessage.notification?.body,
        //     vibrate: true,
        //     channelId: 'channel2020',
        //     vibration: 300,
        //     playSound: true,
        //     color: remoteMessage.notification?.android?.color,
        //     soundName: 'default',
        //     userInfo: remoteMessage.data,
        //   });

        if (remoteMessage.data.status === 'assigned_to_driver') {
          if (remoteMessage.data.order_id) {
            APIs.getOrderDetail(remoteMessage.data.order_id).then(res => {
              if (res && res.status) {
                console.log('Örder', JSON.stringify(res.data));
                setTimeout(() => {
                  RemoteNavigation({...res.data, ...remoteMessage.data});
                }, 1000);
              }
            });
          }
        }
      });
      return unsubscribe;
    }
  }, [loggedIn]);
  useEffect(() => {
    if (loggedIn) {
      online
        ? putLocationListener(({latitude, longitude}) => {
            APIs.toggleOff_OnLine(true, latitude, longitude);
            const {
              ORDERS: {currentOrder},
            } = Store.getState();
            currentOrder !== null &&
              APIs.orderLocation(currentOrder.id, longitude, latitude);
            //Actions.updateLocation({latitude, longitude})(dispatch);
          })
        : setTimeout(() => {
            APIs.toggleOff_OnLine(false);
          }, 1000);
    }
    return Geolocation.stopObserving;
  }, [loggedIn, online]);
  const getNotifications = async () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from background state',
          remoteMessage.notification,
        );
      }
    });
    await messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state',
            remoteMessage.notification,
          );
        }
      });
  };
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
          <Screen
            name={'orderDetail'}
            component={OrderDetail}
            options={{title: 'Order Detail', headerTitleAlign: 'center'}}
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
