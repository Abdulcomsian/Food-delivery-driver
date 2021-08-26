import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from '@constants';
import {} from '@constants/interfaces';
const orderDetail = ({
  navigation,
  route,
}: {
  navigation: object;
  route: object;
}) => {
  const {top, bottom} = useSafeAreaInsets();
  const {} = route.params;
  return (
    <View
      style={[
        styles.screenCont,
        {paddingBottom: bottom, paddingTop: top},
      ]}></View>
  );
};

const styles = StyleSheet.create({
  screenCont: {flex: 1, backgroundColor: Colors.white},
});

export default orderDetail;
