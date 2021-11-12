/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  GestureResponderEvent,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Platform,
  Text,
} from 'react-native';
import {Colors} from '@constants';

const ButtonA = ({
  style = {},
  textStyle = {},
  title = '',
  onPress = () => {},
  disable = false,
}: {
  disable?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
}) => {
  return (
    <TouchableOpacity
      disabled={disable}
      activeOpacity={0.85}
      onPress={onPress}
      style={{
        borderRadius: 6,
        height: Platform.OS === 'android' ? 48 : 44,
        backgroundColor: Colors.black,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}>
      <Text
        style={{
          color: Colors.white,
          fontSize: Platform.OS === 'android' ? 17 : 16,
          ...textStyle,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default {ButtonA};
