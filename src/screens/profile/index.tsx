/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Platform, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {widthPercentageToDP as WP} from 'react-native-responsive-screen';
import {Colors, Images, TextFamily} from '@constants';
import {Headers, Cards, ImageTaker} from '@components';
import {useSelector} from 'react-redux';
const ProfileScreen = ({navigation}: {navigation: any}) => {
  const {bottom} = useSafeAreaInsets();
  const {detail, loggedIn} = useSelector(({USER}) => USER);
  return (
    <View style={[ProfileStyle.container, {paddingBottom: bottom}]}>
      <Headers.HeaderA
        title="Profile"
        navigation={navigation}
        renderRight={false}
      />
      <ImageTaker photoSetter={({mime, path}) => {}}>
        <Image source={Images.avatar} style={ProfileStyle.avatar} />
      </ImageTaker>
      <Text style={ProfileStyle.profileName}>
        {loggedIn ? detail.name : ''}
      </Text>
      <View style={[ProfileStyle.rowify, {marginTop: 10}]}>
        <Text style={ProfileStyle.profileRate}>{'4.63'}</Text>
        <Image source={Images.star} style={ProfileStyle.star} />
      </View>
      <View
        style={[
          ProfileStyle.rowify,
          {marginTop: 10, justifyContent: 'space-around', width: WP(100) - 40},
        ]}>
        <Cards.CounterCard
          title={`Order\nAccepted`}
          subTitle="30"
          color={Colors.indego}
        />
        <Cards.CounterCard title={`Order\nRejected`} subTitle="40" />
        <Cards.CounterCard
          title={`Total\nEarned`}
          subTitle="$500"
          color={Colors.green}
        />
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
