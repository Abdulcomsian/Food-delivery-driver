/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
//-------------------------------------------------------------
import Home from '@screens/home';
import Notifications from '@screens/notifications';
import Profile from '@screens/profile';
import Commission from '@screens/commission';
import OrdersHistory from '@screens/ordersHistory';
//-------------------------------------------------------------
import {Colors, TextFamily} from '@constants';
import CustomDrawerContent from './customDrawer';
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
          fontFamily: TextFamily.ROBOTO_BOLD,
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
export default Drawer;
