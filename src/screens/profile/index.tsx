/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {widthPercentageToDP as WP} from 'react-native-responsive-screen';
import {Colors, Images, TextFamily} from '@constants';
import {Headers} from '@components';
const ProfileScreen = ({navigation, route}: {navigation: any; route: any}) => {
  const {top, bottom} = useSafeAreaInsets();
  return (
    <View style={[ProfileStyle.container, {paddingBottom: bottom}]}>
      <Headers.HeaderA
        title="Profile"
        navigation={navigation}
        renderRight={false}
      />
      <Image source={Images.avatar} style={ProfileStyle.avatar} />
      <Text style={ProfileStyle.profileName}>{'Profile Name'}</Text>
      <View style={[ProfileStyle.rowify, {marginTop: 10}]}>
        <Text style={ProfileStyle.profileRate}>{'4.63'}</Text>
        <Image source={Images.star} style={ProfileStyle.star} />
      </View>
    </View>
  );
};

export default ProfileScreen;

const ProfileStyle = StyleSheet.create({
  rowify: {flexDirection: 'row', alignItems: 'center'},
  avatar: {width: WP(40), height: WP(40), resizeMode: 'contain'},
  star: {width: 15, height: 15, marginLeft: 5, resizeMode: 'contain'},
  profileRate: {
    textAlign: 'center',
    fontFamily: TextFamily.ROBOTO_BOLD,
    fontSize: Platform.OS === 'android' ? 17 : 16,
  },
  profileName: {
    textAlign: 'center',
    fontFamily: TextFamily.ROBOTO_BOLD,
    marginTop: 10,
    fontSize: Platform.OS === 'android' ? 17 : 16,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
});
