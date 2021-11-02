/* eslint-disable react-native/no-inline-styles */
import React, {Fragment} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Text, View, Switch, Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
//-------------------------------------------------------------
import {Colors, TextFamily} from '@constants';
import {Buttons} from '@components';
import {navigationRef} from '../navigationHelper';
//--------------------------------------------------------------
import {
  InitialUserInterface,
  AppStatesInterface,
  OrdersStatesInterface,
} from '@constants/interfaces';
import ACTIONS from '@redux/actions';
//--------------------------------------------------------------
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
  const closeIt = () => {
    const {closeDrawer} = props.navigation;
    closeDrawer();
  };
  return (
    <Fragment>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      {/* {online && (
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
              setTimeout(closeIt, 300);
            }}
          />
        </View>
      )} */}
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
            locationEnabled
              ? (ACTIONS.userToggleOnlineStatus(!online)(dispatch),
                setTimeout(closeIt, 300))
              : navigationRef.current.navigate('locationswitcher');
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
export default CustomDrawerContent;
