/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {widthPercentageToDP as WP} from 'react-native-responsive-screen';
import {Colors} from '@constants';
import {Headers} from '@components';
const CommissionScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const {top, bottom} = useSafeAreaInsets();
  return (
    <View style={CommissionStyle.container}>
      <Headers.HeaderA title="Commission" navigation={navigation} />
    </View>
  );
};

export default CommissionScreen;

const CommissionStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  header: {
    height: 56,
    width: WP(100) - 30,
    justifyContent: 'center',
    marginBottom: 30,
  },
});
