/* eslint-disable react-native/no-inline-styles */
import React, {Fragment} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Text, View, Switch, Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
//-------------------------------------------------------------
import Home from '@screens/home';
import Notifications from '@screens/notifications';
import Profile from '@screens/profile';
import Commission from '@screens/commission';
import OrdersHistory from '@screens/ordersHistory';
import {Colors, TextFamily} from '@constants';
import {Buttons} from '@components';
import {navigationRef} from '../navigationHelper';
//--------------------------------------------------------------
import {
  InitialUserInterface,
  AppStatesInterface,
  OrdersStatesInterface,
} from '../../constants/interfaces';
import ACTIONS from '@redux/actions';
//--------------------------------------------------------------
const {Navigator, Screen} = createDrawerNavigator();

const Drawer = () => {
  return (
    <Navigator
      drawerType="back"
      drawerContentOptions={{
        activeBackgroundColor: Colors.red,
        activeTintColor: Colors.white,
        inactiveTintColor: Colors.red,

        labelStyle: {
          fontSize: 16,
          fontFamily: 'Roboto-Bold',
          textTransform: 'capitalize',
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Screen name="home" component={Home} />
      <Screen
        name="commission"
        component={Commission}
        options={{unmountOnBlur: true}}
      />
      <Screen
        name="ordersHistory"
        component={OrdersHistory}
        options={{drawerLabel: 'Orders history', unmountOnBlur: true}}
      />
      <Screen name="notifications" component={Notifications} />
      <Screen name="profile" component={Profile} />
    </Navigator>
  );
};

const CustomDrawerContent = props => {
  const dispatch = useDispatch();
  const {online, locationEnabled, orderOrigin} = useSelector(
    ({
      USER,
      APP,
      ORDERS,
    }: {
      USER: InitialUserInterface;
      APP: AppStatesInterface;
      ORDERS: OrdersStatesInterface;
    }) => ({
      ...USER,
      ...APP,
      ...ORDERS,
    }),
  );
  return (
    <Fragment>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      {online && (
        <View
          style={{
            width: '100%',
            paddingHorizontal: 10,
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontFamily: TextFamily.ROBOTO_BOLD,
              marginBottom: 10,
            }}>
            Developer Mode
          </Text>
          <Buttons.ButtonA
            title={'Fake Incoming order'}
            onPress={() => {
              ACTIONS.incomingOrder({
                id: 888,
                hotel: {
                  latitude: orderOrigin?.latitude + 0.007,
                  longitude: orderOrigin?.longitude,
                },
                destination: {
                  latitude: orderOrigin?.latitude - 0.007,
                  longitude: orderOrigin?.longitude,
                },
                origin: {
                  latitude: orderOrigin?.latitude,
                  longitude: orderOrigin?.longitude,
                },
                items: [],
              })(dispatch);
              setTimeout(props.navigation.closeDrawer, 300);
            }}
          />
        </View>
      )}
      <View
        style={{
          alignSelf: 'center',
          alignItems: 'center',
          width: '80%',
          marginBottom: 15,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <StatusText
          title={'Offline'}
          activeColor={Colors.dark}
          isTrue={!online}
        />
        <Switch
          value={online}
          thumbColor={online ? Colors.white : Colors.dark}
          trackColor={{
            false: Platform.OS === 'android' ? Colors.Grey4 : Colors.white,
            true: Colors.red,
          }}
          ios_backgroundColor={Colors.red2}
          onValueChange={() => {
            if (locationEnabled) {
              ACTIONS.userToggleOnlineStatus()(dispatch);
              setTimeout(props.navigation.closeDrawer, 300);
            } else {
              navigationRef.current.navigate('locationswitcher');
            }
          }}
        />
        <StatusText title={'Online'} activeColor={Colors.red} isTrue={online} />
      </View>
      <Buttons.ButtonA
        title="Logout"
        onPress={() => {
          setTimeout(() => {
            ACTIONS.userLogout()(dispatch);
          }, 1000);
        }}
        style={{
          width: '80%',
          alignSelf: 'center',
          backgroundColor: Colors.red2,
        }}
        textStyle={{fontFamily: TextFamily.ROBOTO_BOLD, color: Colors.red}}
      />
      <Text
        style={{
          fontSize: 16,
          fontFamily: TextFamily.ROBOTO_BOLD,
          textTransform: 'capitalize',
          textAlign: 'center',
          marginBottom: 40,
          marginTop: 20,
          color: Colors.red,
        }}>
        V0.1
      </Text>
    </Fragment>
  );
};
const StatusText = ({
  isTrue = true,
  activeColor = Colors.green,
  title = '',
}: {
  isTrue?: boolean;
  activeColor?: string;
  title?: string;
}) => {
  return (
    <Text
      style={{
        color: isTrue ? activeColor : Colors.red2,
        fontFamily: TextFamily.ROBOTO_BLACK,
        fontSize: 15,
      }}>
      {title}
    </Text>
  );
};
export default Drawer;
