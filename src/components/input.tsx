/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {Fragment, useRef, useState} from 'react';
import {
  TouchableOpacity,
  ViewStyle,
  TextInput,
  Image,
  View,
  KeyboardTypeOptions,
  Text,
} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import {Colors, Images} from '@constants';
import {widthPercentageToDP as WP} from 'react-native-responsive-screen';
const PhoneInputField = ({
  style = {},
  value = '',
  setValue = e => {},
  error = false,
}: {
  style?: ViewStyle;
  value?: string;
  setValue?: Function;
  error?: string | boolean;
}) => {
  const InputRef = useRef(null);
  return (
    <View
      style={{
        marginTop: 26,
        borderRadius: 22,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: error ? Colors.red : Colors.GreyTransparent5,
        height: 48,
        width: WP(100) - 50,
        paddingHorizontal: 10,
        backgroundColor: value.length ? Colors.white : Colors.GreyTransparent5,
        ...style,
      }}>
      <View
        style={{
          flex: 1,
          height: '100%',
          justifyContent: 'center',
        }}>
        <PhoneInput
          ref={InputRef}
          autoFormat={true}
          onPressFlag={() => {}}
          initialCountry={'us'}
          onChangePhoneNumber={setValue}
          textStyle={{color: Colors.dark, fontSize: 17, marginRight: 5}}
          textProps={{
            placeholder: '',
            returnKeyType: 'done',
          }}
        />
      </View>
      {/* <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setValue('');
          InputRef.current.setValue('');
        }}
        style={{
          marginLeft: 5,
        }}>
        <View
          style={{
            height: 26,
            width: 26,
            borderRadius: 13,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.Grey5,
          }}>
          <Image
            source={Images.close2}
            style={{
              height: 14,
              width: 14,
              resizeMode: 'contain',
            }}
          />
        </View>
      </TouchableOpacity> */}
    </View>
  );
};
const NormalInputField = ({
  style = {},
  value = '',
  setValue = e => {},
  error = '',
  placeholder = '',
  keyboardType = 'default',
  passwordField = false,
}: {
  style?: ViewStyle;
  value?: string;
  placeholder?: string;
  setValue?: Function;
  setPasswordShow?: Function;
  error?: string | boolean;
  passwordShow?: boolean;
  passwordField?: boolean;
  keyboardType?: KeyboardTypeOptions;
}) => {
  const [show, setShow] = useState(false);
  return (
    <View>
      <View
        style={{
          marginTop: 26,
          borderRadius: 22,
          borderWidth: 1,
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: error ? Colors.red : Colors.GreyTransparent5,
          height: 48,
          width: WP(100) - 50,
          paddingHorizontal: 15,
          backgroundColor: value.length
            ? Colors.white
            : Colors.GreyTransparent5,
          ...style,
        }}>
        <View
          style={{
            flex: 1,
            height: '100%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            keyboardType={keyboardType}
            secureTextEntry={passwordField ? show : false}
            style={{
              flex: 1,
              height: 40,
              //width: '100%',
              paddingBottom: 0,
              fontSize: 17,
              fontFamily: 'Roboto-Regular',
            }}
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            placeholderTextColor={Colors.Grey7}
          />
          {passwordField && (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => {
                setShow(!show);
              }}
              style={{
                height: 48,
                width: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={show ? Images.invisible : Images.visible}
                style={{height: 25, width: 25}}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {Boolean(error) && (
        <Text style={{fontSize: 14, color: 'red', marginLeft: 10}}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default {PhoneInputField, NormalInputField};
