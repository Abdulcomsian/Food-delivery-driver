/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {widthPercentageToDP as WP} from 'react-native-responsive-screen';
import {Colors} from '@constants';
import {emailIsValid} from '@utils/libs';
import {Input} from '@components';
import Hooks from '@hooks';
import {useDispatch} from 'react-redux';
import Actions from '@redux/actions';
import APIs from '@utils/APIs';
const LoginScreen = ({navigation}: {navigation: any}) => {
  const {top, bottom} = useSafeAreaInsets();
  const dispatch = useDispatch();
  // const [phone, setPhone] = useState<string>('');
  // const [phoneErr, setPhoneErr] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailErr, setEmailErr] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordErr, setPasswordErr] = useState<string>('');
  const [keyboardHeight] = Hooks.useKeyboard();

  //console.log('Number', phone.replace(/\s/g, ''));
  const LocalValidate = () => {
    if (!emailIsValid(email) || password.length < 8) {
      password.length < 8 &&
        setPasswordErr('Password must be greater then 7 characters');
      !emailIsValid(email) && setEmailErr('Email is not valid');
      return false;
    }
    TryToLogin();
  };
  const TryToLogin = () => {
    APIs.signIn({email, password})
      .then(RES => {
        if (RES) {
          console.log('ss',RES)
          const {status, errMsg} = RES;
          if (status) {
            Actions.userAuthenticate(RES)(dispatch);
          } else {
          }
        }
      })
      .finally(() => {});
  };
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
        keyboardType="email-address"
        placeholder="Email"
        value={email}
        setValue={(e: string) => {
          setEmail(e);
          emailErr && setEmailErr('');
        }}
        error={emailErr}
      />
      <Input.NormalInputField
        passwordField={true}
        value={password}
        placeholder="Password"
        setValue={(e: string) => {
          setPassword(e);
          passwordErr && setPasswordErr('');
        }}
        error={passwordErr}
      />
      <TouchableOpacity
        onPress={LocalValidate}
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
