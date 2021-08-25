/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {widthPercentageToDP as WP} from 'react-native-responsive-screen';
import {Colors} from '@constants';
import APIs from '@utils/APIs';
import {Input} from '@components';
import Hooks from '@hooks';
const LoginScreen = ({navigation}: {navigation: any}) => {
  const {top, bottom} = useSafeAreaInsets();
  // const [phone, setPhone] = useState<string>('');
  // const [phoneErr, setPhoneErr] = useState<string>('');

  const [email, setEmail] = useState<string>('');
  const [emailErr, setEmailErr] = useState<string>('');

  const [password, setPassword] = useState<string>('');
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [passwordErr, setPasswordErr] = useState<string>('');

  const [keyboardHeight] = Hooks.useKeyboard();
  
  //console.log('Number', phone.replace(/\s/g, ''));
  return (
    <View
      style={[loginStyle.container, {paddingTop: top, paddingBottom: bottom}]}>
      <View style={loginStyle.header} />
      {/* <HeaderBackButton
          truncatedLabel={''}
          tintColor={Colors.black}
          style={{height: 48, width: 48}}
          pressColorAndroid={Colors.transparent}
          backAble={false}
        /> 
      </View>
      <Text style={loginStyle.title}>Login with your phone number</Text>
      <Text style={loginStyle.subTitle}>
        We have sent you an SMS with a code to number +923035191910
      </Text>
      <Input.PhoneInputField
        value={phone}
        setValue={e => {
          setPhone(e);
          console.log(e);
          phoneErr && setPhoneErr('');
        }}
        error={Boolean(phoneErr)}
      /> */}
      <Text style={loginStyle.title}>Login with your email and password</Text>
      <Text style={loginStyle.subTitle}>Enter your email and password</Text>
      <Input.NormalInputField
        keyboardType={'email-address'}
        placeholder="Email"
        setValue={e => {
          setEmail(e);
          console.log('email', e);
          emailErr && setEmailErr('');
        }}
        error={Boolean(emailErr)}
      />
      <Input.NormalInputField
        passwordField={true}
        placeholder="Password"
        passwordShow={passwordShow}
        setPasswordShow={setPasswordShow}
        setValue={e => {
          setPassword(e);
          console.log('password', e);
          passwordErr && setPasswordErr('');
        }}
        error={Boolean(passwordErr)}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('phoneVerification', {email, password});
        }}
        style={[
          loginStyle.btn,
          keyboardHeight === 0
            ? {paddingBottom: bottom, height: 48 + bottom}
            : {
                paddingBottom: 0,
                height: 48,
                bottom: Platform.OS === 'ios' ? keyboardHeight : 0,
              },
        ]}>
        <Text style={loginStyle.btnTitle}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const loginStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  header: {
    height: 56,
    width: WP(100) - 30,
    justifyContent: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 34,
    fontFamily: 'Roboto-Black',
    //fontWeight: '800',
    textAlign: 'center',
    width: '90%',
    color: Colors.green,
  },
  subTitle: {
    fontFamily: 'Roboto-Regular',
    marginTop: 12,
    fontSize: 16,
    textAlign: 'center',
    width: 295,
  },
  btn: {
    backgroundColor: Colors.red,
    width: WP(100),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  btnTitle: {
    fontSize: 17,
    fontFamily: 'Roboto-Regular',
    color: Colors.white,
  },
});
