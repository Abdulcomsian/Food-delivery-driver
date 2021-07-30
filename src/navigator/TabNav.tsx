/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Images} from '../constants';
//---------------------------------------------------------------------
import Home from '../screens/locationSwitcher';
import {Colors} from '../constants';
//---------------------------------------------------------------------
const {Navigator, Screen} = createBottomTabNavigator();

const BottomTabs = () => {
  const {bottom} = useSafeAreaInsets();
  return (
    <Navigator tabBar={props => <TabBar {...props} bottom={bottom} />}>
      <Screen name="homeTab" component={Home} />
      <Screen name="wishlist" component={Home} />
      <Screen name="cart" component={Home} />
      <Screen name="notification" component={Home} />
      <Screen name="account" component={Home} />
    </Navigator>
  );
};
const TabBar = ({state, descriptors, navigation, bottom}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        height: 63 + bottom,
        paddingBottom: bottom,
        width: wp(100),
        //...getShadow(8,),
        //justifyContent: 'space-around',
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        const icon =
          route.name === 'homeTab'
            ? Images[`home${isFocused ? 'Tabbed' : ''}`]
            : route.name === 'wishlist'
            ? Images[`favorite${isFocused ? 'Tabbed' : ''}`]
            : route.name === 'cart'
            ? Images.cart
            : route.name === 'notification'
            ? Images[`notification${isFocused ? 'Tabbed' : ''}`]
            : Images[`account${isFocused ? 'Tabbed' : ''}`];

        return (
          <TouchableOpacity
            key={'_Tab' + index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: index === 2 ? 1.5 : 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: index === 2 ? Colors.transparent : Colors.white,
              //...getShadow(index === 2 ? 0 : 5),
            }}>
            {index !== 2 ? (
              <Image
                style={{width: 23, height: 23, resizeMode: 'contain'}}
                source={icon}
              />
            ) : (
              <View
                style={{
                  position: 'absolute',
                  top: -35,
                  width: 65,
                  height: 65,
                  borderRadius: 65 / 2,
                  // borderTopLeftRadius: 65 / 2,
                  backgroundColor: Colors.red,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{width: 30, height: 30, resizeMode: 'contain'}}
                  source={icon}
                />
                {/* <View>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      backgroundColor: Colors.transparent,
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        height: 50,
                        width: 50,
                        borderBottomRightRadius: 25,
                      }}
                    />
                  </View> 
                </View>*/}
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
export default BottomTabs;
