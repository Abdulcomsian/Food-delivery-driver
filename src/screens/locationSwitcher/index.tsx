import React, {useState} from 'react';
import {View, Text, Image, Platform, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as WP,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors, Images} from '@constants';
import {Buttons} from '@components';
import Actions from '@redux/actions';
import {getLocation} from '@utils/libs';
import {useDispatch} from 'react-redux';
const LocationSwitcher = ({navigation}: {navigation: any}) => {
  const {top, bottom} = useSafeAreaInsets();
  const dispatch = useDispatch();
  const fff = (pos: any) => {
    console.log('Postition', pos);
    Actions.letsEnableLocation()(dispatch);
    navigation.goBack();
  };
  // const getLocation = async (functionToPerf: Function) => {
  //   const hasPermission = await hasLocationPermission();
  //   if (!hasPermission) {
  //     return;
  //   }
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       functionToPerf(position);
  //       console.log(position);
  //       Actions.letsEnableLocation()(dispatch);
  //       navigation.goBack();
  //     },
  //     error => {
  //       Alert.alert(`Code ${error.code}`, error.message);
  //       console.log(error);
  //     },
  //     {
  //       accuracy: {
  //         android: 'balanced',
  //         ios: 'nearestTenMeters',
  //       },
  //       enableHighAccuracy: true,
  //       timeout: 15000,
  //       maximumAge: 10000,
  //       distanceFilter: 0,
  //       forceRequestLocation: true,
  //       showLocationDialog: true,
  //     },
  //   );
  // };
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
        onPress={() => getLocation(fff)}
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
